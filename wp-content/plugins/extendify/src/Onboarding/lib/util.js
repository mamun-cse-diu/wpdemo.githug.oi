export const findTheCode = (item) =>
    [item?.template?.code, item?.template?.code2].filter(Boolean).join('')
