export const CREAT_PIN_MUTATION =`
    mutation($title: string!, $image: String!, $content: String!, $latitude: Float!, $longitude: Float!) {
        createPin(input: {
         title: $title,
         image: $image,
         content: $content, 
         latitude: $latitude, 
         longitude: $longitude
        }) {
            _id
            createdAt
            title
            image
            content
            latitude
            longitude
            author {
                _id
                name
                email
                picture
            }
        }
    }
`