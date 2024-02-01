import { apiSlice } from "../api/apiSlice";
const USERS_BACKEND_URL='/api/user'

export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(credentials)=>({
               url:`${USERS_BACKEND_URL}/login` ,
               method:'POST',
               body:credentials
            })

        }),
        register:builder.mutation({
            query:(credentials)=>({
               url:`${USERS_BACKEND_URL}/register` ,
               method:'POST',
               body:credentials
            })
        }),



        logout:builder.mutation({
            query:()=>({
                url:`${USERS_BACKEND_URL}/logout` ,
                method:'POST',
            })
        }),

        updateProfile:builder.mutation({
            query:(credentials)=>({
               url:`${USERS_BACKEND_URL}/profile` ,
               method:'PUT',
               body:credentials
            })
        }),



        

        getSubscriptionPlans: builder.query({
            query: () => ({
              url: `${USERS_BACKEND_URL}/subscribe`,
              method: 'GET',
              
            })
        }),

        createSession: builder.mutation({
          query: (id) => ({
            url: `${USERS_BACKEND_URL}/checkout`,
            method: 'POST',
            body: { id },
          }),
        }),


        getWatchlist: builder.query({
            query: () => ({
              url: `${USERS_BACKEND_URL}/watchList`,
              method: 'GET',

            }),
            providesTags:['User']
            
          }),

          addToWatchlist: builder.mutation({
            query: (newItem) => ({
              url:`${USERS_BACKEND_URL}/watchList`,
              method: 'POST',
              body: newItem,
            }),
            invalidatesTags:['User']
          }),
          
          removeFromWatchlist: builder.mutation({
            query: (contentId) => ({
              url: `${USERS_BACKEND_URL}/watchList/${contentId}`,
              method: 'DELETE',
            }),
            invalidatesTags:['User']
          }),

          
    clearWatchlist: builder.mutation({
        query: () => ({
          url: `${USERS_BACKEND_URL}/watchList`,
          method: 'DELETE',
        }),
        invalidatesTags:['User']
      }),



    }),
})




export const {useLoginMutation,
            useLogoutMutation,
            useRegisterMutation,
            useUpdateProfileMutation,
            useAddToWatchlistMutation,
            useGetWatchlistQuery,
            useClearWatchlistMutation,
            useRemoveFromWatchlistMutation,
            useGetSubscriptionPlansQuery,
            useCreateSessionMutation
        }=userApiSlice