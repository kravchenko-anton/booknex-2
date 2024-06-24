import prettify from '@liquify/prettify';
import { HttpStatus } from '@nestjs/common';
import EPub from 'epub2';
import { adminErrors, globalErrors } from 'global/errors';
import { JSDOM } from 'jsdom';
import { serverError } from '../../utils/helpers/server-error';
export const clearHtmlElement = (element) => {
    const attributes = element.getAttributeNames();
    for (const attribute of attributes) {
        if (attribute === 'src')
            continue;
        element.removeAttribute(attribute);
    }
    if (element.tagName === 'svg')
        element.remove();
    if (element.tagName === 'iframe')
        element.remove();
    if (element.tagName === 'script')
        element.remove();
    if (element.tagName === 'style')
        element.remove();
    if (element.tagName === 'table')
        element.remove();
    if (element.tagName === 'TABLE')
        element.remove();
    if (element.tagName === 'SUP')
        element.remove();
    if (element.tagName === 'SUB')
        element.remove();
    if (element.tagName === 'hr')
        element.remove();
    if (element.tagName === 'HR')
        element.remove();
    return element;
};
export const updatedContent = async (text) => {
    const dom = new JSDOM(String(text));
    const clearElements = dom.window.document.querySelectorAll('*');
    const elements = [...clearElements].map(element => clearHtmlElement(element));
    for (const element of elements) {
        if ((element.tagName === 'a' ||
            element.tagName === 'A' ||
            element.tagName === 'p' ||
            element.tagName === 'P') &&
            element.childElementCount > 1) {
            const div = dom.window.document.createElement('div');
            div.innerHTML = element.innerHTML;
            element.replaceWith(div);
        }
    }
    if (!prettify.format) {
        throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
    }
    return prettify
        .format(dom.window.document.body?.innerHTML || '', {
        language: 'html',
        indentSize: 2,
        endNewline: true
    })
        .then((formatted) => formatted);
};
const insertIdToImages = (text, imagesData) => {
    const dom = new JSDOM(text);
    const images = dom.window.document.querySelectorAll('img');
    for (const img of images) {
        const imgData = imagesData.find(data => '/images/' + data.href === img.src);
        if (!imgData) {
            console.log(imagesData, 'no imgData');
            img.remove();
        }
        if (imgData?.id.startsWith('cover')) {
            console.log('cover');
            img.remove();
        }
        console.log(imgData, 'imgData');
        img.setAttribute('id', imgData?.id || '');
        img.setAttribute('alt', img.src);
        img.removeAttribute('src');
    }
    return dom.window.document.body?.innerHTML || '';
};
export const getEbook = async (buffer) => new Promise(resolve => {
    const epub = new EPub(buffer, '/images/', '/chapters/');
    epub.on('end', function () {
        const images = epub.listImage();
        const finalAnswer = {
            images: [],
            chapters: []
        };
        const imgData = [];
        for (const img of images) {
            if (!img.id)
                return;
            epub.getImage(img.id, (_, data) => {
                if (!data)
                    return null;
                return imgData.push({
                    id: img.id || '',
                    href: img.href || '',
                    data: data,
                    mimeType: img.mediaType || 'image/jpeg'
                });
            });
        }
        const flow = epub.flow.map((chapter, index) => new Promise(resolve => {
            try {
                if (!chapter.id)
                    return;
                epub.getChapter(chapter.id, async (error, text) => {
                    if (error)
                        return null;
                    if (!text)
                        return null;
                    const finalContent = await updatedContent(text);
                    resolve({
                        id: (index + 1).toString(),
                        name: String(chapter.title),
                        text: finalContent
                    });
                    return null;
                });
            }
            catch {
                throw serverError(HttpStatus.BAD_REQUEST, adminErrors.invalidChapter);
            }
        }));
        Promise.all(flow)
            .then((chapters) => {
            const validChapters = chapters.filter(chapter => chapter?.text !== null);
            finalAnswer.images = imgData.map(img => ({
                id: img.id,
                href: img.href,
                mimeType: img.mimeType,
                data: img.data.toString('base64')
            }));
            console.log(imgData, 'imgData before');
            finalAnswer.chapters = validChapters.map((chapter, index) => ({
                id: String(index + 1),
                name: chapter?.name || '',
                text: insertIdToImages(chapter?.text || '', imgData)
            }));
            resolve({
                images: finalAnswer.images.filter(img => img.id !== 'cover'),
                chapters: finalAnswer.chapters
            }); // Resolve the promise with the finalAnswer object
        })
            .catch(() => serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong));
    });
    epub.parse();
});
//# sourceMappingURL=unfold-ebook.js.map