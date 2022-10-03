export const CREAT_PIN_MUTATION =`
    mutation($title: string!, $image: String!, $content: String!, $latitude: Float!, $longitude: Float!) {
        createPin(input: {
         title: $title,
         $image: String!,
         $content: String!, 
         $latitude: Float!, 
         $longitude: Float!
        }) 
    }
`