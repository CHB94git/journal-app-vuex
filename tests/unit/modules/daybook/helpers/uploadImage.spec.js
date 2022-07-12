import axios from 'axios';
import 'setimmediate';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config()

import uploadImage from '@/modules/daybook/helpers/uploadImage';

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

/* cloudinary.config({
    cloud_name: 'chbx8xpui',
    api_key: '271664382861435',
    api_secret: 'DQeNr1kuzNxkouO_iC7Tg6C4HqM'
}) */


describe('Pruebas en el uploadImage', () => {

    it('debe de cargar un archivo y retornar el url', async (done) => {

        const { data } = await axios.get('https://res.cloudinary.com/chbx8xpui/image/upload/v1657319619/Journal-app/gxqcd0xwwuy1udfkomka.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([data], 'photo.jpg')

        const url = await uploadImage(file)

        expect(typeof url).toBe('string')

        // Tomar el ID de la imagen a eliminar

        const segmentsUrl = url.split('/')
        const imgId = segmentsUrl[segmentsUrl.length - 1].replace('.jpg', '')
        cloudinary.v2.api.delete_resources(imgId, {}, () => {
            done()
        })

    });

});