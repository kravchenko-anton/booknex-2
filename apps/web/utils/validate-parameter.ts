//TODO: проверить во всех вариантах валидацию
export const validateNumberParameter = (parameter: any): number => {
  if (!parameter) return 0;
  const parameters = +parameter || 0;
  if (parameters <= 0) throw new Error('Invalid parameter');
  if (parameters !== Math.floor(parameters)) throw new Error('Invalid parameter');
  return parameters;
};

export const validateStringParameter = (parameter: any): string => {
  if (!parameter) return '';
  if (typeof parameter !== 'string') throw new Error('Invalid parameter');

  return parameter;
};
