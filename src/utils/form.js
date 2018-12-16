export const required = value =>
  value || typeof value === 'number' ? undefined : 'Required';
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters allowed'
    : undefined;
export const files = (min, max) => files => {
  let meetsMin = true;
  let meetsMax = true;
  const uploadedFiles =
    files && files.filter(file => file.progress === 100 && file.error === null);

  if (min && uploadedFiles && uploadedFiles.length < min) {
    meetsMin = false;
  }
  if (max && uploadedFiles && uploadedFiles.length > max) {
    meetsMax = false;
  }

  if (!meetsMin && !meetsMax) {
    return `Please upload at between ${min} and ${max} files`;
  } else if (!meetsMin) {
    return `Please upload at least ${min} file${min > 1 ? 's' : ''}`;
  } else if (!meetsMax) {
    return `Please upload at most ${max} file${max > 1 ? 's' : ''}`;
  }
};

// export const hasFiles = (value, allValues, props) =>
//   value && value.length > 0 ? undefined : 'Required';
// export const minFilesLength = min => files =>
//   !files || files.length < min ? `Must be ${min} files or more` : undefined;
// export const maxFilesLength = max => files =>
//   files && files.length > max ? `Must be ${max} files or less` : undefined;

export const validation = {
  required,
  minLength,
  maxLength,
  number,
  minValue,
  email,
  alphaNumeric,
  files,
  // hasFiles,
  // minFilesLength,
  // maxFilesLength,
};
