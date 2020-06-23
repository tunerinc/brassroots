import BackgroundTask from 'react-native-background-task'
import queueFactory from 'react-native-queue';

export default async function () {
    BackgroundTask.define(async () => {
        // Of course this line needs to be in the context of an async function,
        // otherwise use queueFactory.then((queue) => { console.log('add workers and jobs here'); });
        const queue = await queueFactory();

        // Register the worker function for "example-job" jobs.
        queue.addWorker('example-job', async (id, payload) => {
            console.log('EXECUTING "example-job" with id: ' + id);
            console.log(payload, 'payload');

            await new Promise((resolve) => {
                setTimeout(() => {
                    console.log('"example-job" has completed!');
                    resolve();
                }, 5000);
            });
        });
        return queue;
    });
}
