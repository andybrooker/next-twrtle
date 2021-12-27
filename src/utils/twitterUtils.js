export const getUser = async ({ req, username }) => {

    const { data } = await req.twitter.userByUsername(username, { 'user.fields': 'profile_image_url' })

    return data

}