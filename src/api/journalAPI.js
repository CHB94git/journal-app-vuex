
import { create } from 'axios';

const journalApi = create({
    baseURL: 'https://curso-vue-journal-app-default-rtdb.firebaseio.com'
})

export default journalApi