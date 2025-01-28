import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from "next-redux-wrapper";

export const jsonServerApiBlogs = createApi({
  reducerPath: 'jsonServerApiBlogs',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.jkcarmart.com/wp-json/wp/v2' }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({    
    getLatestBlogPosts: builder.query({      
      query: () => `/posts?_embed&per_page=4`,
      //query: () => "/posts?_fields=slug,date,title,excerpt,_links,_embedded&_embed=wp:featuredmedia",
    }),
    getBlogPosts: builder.query({      
      query: () => "/posts?_embed",
      //query: () => "/posts?_fields=slug,date,title,excerpt,_links,_embedded&_embed=wp:featuredmedia",
    }),
    getBlogPost: builder.query({      
      query: (slug) => `/posts?slug=${slug}&_fields=date,title,content,_links,_embedded&_embed=wp:featuredmedia`,
    }),

  }),
});

export const { 
  useGetLatestBlogPostsQuery,
  useGetBlogPostsQuery,
  useGetBlogPostQuery,  
  util: { getRunningQueriesThunk },
} = jsonServerApiBlogs;

export const { getLatestBlogPosts,getBlogPosts,getBlogPost } = jsonServerApiBlogs.endpoints;