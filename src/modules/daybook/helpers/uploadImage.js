import cloudinaryApi from '@/api/cloudinaryApi'
// import axios from 'axios'


const uploadImage = async (fileToUpload) => {

    if (!fileToUpload) return

    try {
        const formData = new FormData()
        formData.append('upload_preset', 'curso-vue-journal')
        formData.append('file', fileToUpload)

        /* const url = 'https://api.cloudinary.com/v1_1/chbx8xpui/image/upload'

        const { data } = await axios.post(url, formData) */

        const { data } = await cloudinaryApi.post('', formData)
        console.log(data);
        return data.secure_url

    } catch (error) {
        console.error('Error al cargar la imagen');
        console.log(error);
        return null
    }
}

export default uploadImage