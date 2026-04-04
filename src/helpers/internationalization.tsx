export function calculateActiveClass(pathname: string, elementPathName: string, language: string) {
    if (elementPathName === "") {
        return pathname === `/${language}`;
    } else if (pathname === elementPathName) {
        return true;
    } else {
        return pathname === `/${language}/${elementPathName}`;
    }
}
