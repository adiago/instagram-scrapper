const axios = require('axios');

export async function getInstagram(user) {
    if(user === 'undefined') return
    if(user === undefined) return
    const response = await axios.post('/api/user', {user: user});
    console.log(response)
    return response.data
}