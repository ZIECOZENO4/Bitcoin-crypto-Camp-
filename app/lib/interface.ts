export interface Post {
    title: string;
    _id: string;
   publishedAt: string;
   author: {
    name: string;
    image: string;
   };
   comments: Comment[];
   description: string;
   mainImage: {
    asset: {
        url: string;
    };
   };
    slug: {
        current: string
    };
    body: [object];
    createdAt: string
}