export const requireField = value => {
    if (!value) return 'Field is require!';
}

export const maxLength = maxLength => value => {
    if (value.length > maxLength) return `Max legnth is ${maxLength} symbols!`;
}