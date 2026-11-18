const trim = (path) => path.replace(/\/+$/, ``) || `/`;

/** Whether `link` is the page being rendered, like Gatsby Link's `activeClassName` */
export const isCurrent = (link, pathname) => !/^https?:/.test(link) && trim(link) === trim(pathname);

export default isCurrent;
