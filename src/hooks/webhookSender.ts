import fetch from 'node-fetch';
import { ConsumerModel } from '../models/consumer';

export const sendNotifications = async (data: any) => {
    let urls: any;
    console.log(data)
    switch(data.evento){
        case "createPromociones":
            urls = await ConsumerModel.find({ createPromociones: true }).select('url');
            break;
        case "deletePromociones":
            urls = await ConsumerModel.find({ deletePromociones: true }).select('url');
            break;
        case "createProductos":
            urls = await ConsumerModel.find({ createProductos: true }).select('url');
            break;
        case "deleteProductos":
            urls = await ConsumerModel.find({ deleteProductos: true }).select('url');
            break;
        case "createService":
            urls = await ConsumerModel.find({ createService: true }).select('url');
                break;
        case "deleteService":
            urls = await ConsumerModel.find({ deleteService: true }).select('url')
                break;
        default:
            urls = [];
    }

    const urlArray: string[] = urls.map((consumer: any) => consumer.url);

    const notificationPromises = [];
    for (const url of urlArray) {
        console.log(data.message, data.data)
        const body = {
            message: data.message,
            data: data.data
        }
        const promise = fetch(url, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Error al enviar notificación a ${url}: ${response.statusText}`);
            }
            return response.json();
        }).catch(error => {
            console.error(error);
            return { success: false, error: `Error al enviar notificación a ${url}` };
        });
        notificationPromises.push(promise);
    }

    return Promise.all(notificationPromises);
}
