export function productDetailHref(productId: string) {
 return `/products/detail?productId=${encodeURIComponent(productId)}`;
}
