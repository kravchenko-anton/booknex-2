import type { CustomizationStoreType } from '@/screens/reader/components/reader-customization/customization-store'
import { windowWidth } from '@/utils/dimensions'
import { Color } from 'global/colors'

export const injectStyle = (style: string) => `
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = \`${style}\`;
 document.head.appendChild(style);
		`
export const getStyleTag = ({
	fontSize,
	font: { fontFamily },
	padding,
	lineHeight,
	colorScheme: { colorPalette }
}: CustomizationStoreType) =>
	`
	span {
		color: ${colorPalette.text} !important;
		font-family: ${fontFamily} !important;
	}
		p {
		color: ${colorPalette.text} !important;
		font-family: ${fontFamily}-Regular !important;
	}
	body {
		background: ${colorPalette.background.normal} !important;
		font-family: ${fontFamily}-Regular !important;
		font-size: ${fontSize}px;
		scroll-behavior: smooth !important;
		line-height: ${lineHeight};
		word-wrap: break-word !important;
		max-width: 100% !important;
		height: 100% !important;
		user-select: element !important;
		padding: ${padding}px;
		behave: smooth !important;
		overflow-x: hidden !important;
		overscroll-behavior: none !important;

		color: ${colorPalette.text};
	}

	li {
		color: ${colorPalette.text} !important;
		font-family: ${fontFamily}-Regular !important;
	}
	a {
		color: ${colorPalette.text} !important;
		font-family: ${fontFamily} !important;
	}
	h1 {
		font-size: ${fontSize * 1.6}px !important;
		font-family: ${fontFamily}-Bold !important;
		color: ${colorPalette.primary} !important;
	}
	h2 {
		font-family: ${fontFamily}-Bold !important;
		color: ${colorPalette.primary} !important;
		font-size: ${fontSize * 1.5}px !important;
	}
	h3 {
		font-family: ${fontFamily}-Bold !important;
		color: ${colorPalette.primary} !important;
		font-size: ${fontSize * 1.4}px !important;
	}
	h4 {
		font-family: ${fontFamily}-Bold !important;
		color: ${colorPalette.primary} !important;
		font-size: ${fontSize * 1.3}px !important;
	}
	h5 {
		font-family: ${fontFamily}-Bold !important;
		font-size: ${fontSize * 1.2}px !important;
		color: ${colorPalette.primary} !important;
	}
	h6 {
		font-family: ${fontFamily}-Bold !important;
		font-size: ${fontSize * 1.1}px !important;
		color: ${colorPalette.secondary} !important;
	}
	::selection {
		background: ${colorPalette.textSelection} !important;
		color: ${colorPalette.text} !important;
	}
	ul {
		color: ${colorPalette.text} !important;
		list-style-type: none;
	}
	ol {
	color: ${colorPalette.text} !important;
	list-style-type: none;
	}
	
	em {
		font-style: italic !important;
	}
	b {
		color: ${colorPalette.secondary} !important;
		font-family: ${fontFamily}-Bold !important;
		
	}
	strong {
		color: ${colorPalette.text} !important;
	}
	i {
		font-style: normal !important;
		color: ${colorPalette.text} !important;
	}
	
	.finish-book-button {
		background: ${colorPalette.background.lighter} !important;
		color: ${colorPalette.text} !important;
				user-select: none !important;
				-webkit-user-select: none !important;
				-moz-user-select: none !important;
	}
	.finish-book-text {
		color: ${colorPalette.text} !important;
		display: flex;
	  align-items: center;
	  justify-content: space-between;
		font-size: 15px;
		width: 95%;
	}
	.finish-book-button-container {
		background: ${colorPalette.background.darker} !important;
	}

	mark {
		background: ${colorPalette.mark.background} !important;
		color: ${colorPalette.mark.text} !important;
		border-radius: 4px !important;
		padding-left: 4px !important;
		padding-right: 4px !important;
		&:hover {
		 background: ${colorPalette.mark.hoverBackground} !important;
	}
	}

	
				#select-menu {
				display: block !important;
        color: ${colorPalette.text} !important;
        padding: 0 !important;
        background: ${Color.transparent} !important;
        width: ${windowWidth * 0.95}px !important;
    }


			.select-menu-reaction {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width:80% !important;
        height: 50px !important;
        background: ${colorPalette.background.lighter} !important;
        border-radius: 100px !important;
    margin-left: auto !important;
        
			}
		
		.select-menu-reaction .select-menu-reaction-item {
        padding: 7.5px 7.5px;
        &:first-child {
            padding-left: 15px;
        }

        &:last-child {
            padding-right: 10px;
				}
    }

    .select-default-menu {
    border-radius: 0px !important;
    margin-top: 5px !important;
    width: 70% !important;
    margin-left: 2% !important;
		background: ${colorPalette.background.lighter} !important;
    margin-right: 5% !important;
    display: block !important;
    margin-left: auto !important;
    
	    }
	    
	 .select-default-menu-item {
	    	display: flex !important;
	    	justify-content: start !important;
	    	gap: 20px !important;
	    	align-items: center !important;
	    	padding: 0 15px !important;
	    	height: 45px !important;	
	    	
	    	> p {
	    		font-size: 18px !important;
	    		color: ${colorPalette.text} !important;
	    		padding: 0;
	    		user-select: none !important;
	    	}
	    	> svg {
					width: 26px !important;
					height: 26px !important;
					min-width: 26px !important;
					min-height: 26px !important;
					stroke: ${colorPalette.text} !important;
					padding: 0;
	    	}
	    }
	    
	    :#select-default-menu-item:focus {
	    	background: ${colorPalette.background.lighter} !important;
	    }
    img {
    max-width: 80% !important;
    max-height: 100% !important;
		object-fit: contain !important;
    display: flex !important;
		margin-top: 20px !important;
		user-select: none !important;
    margin-bottom: 20px !important;
		margin-left: auto !important;
		margin-right: auto !important;
    }
	`
