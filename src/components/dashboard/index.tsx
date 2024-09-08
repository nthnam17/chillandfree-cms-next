import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    useEffect(() => {
        notifications.show({
            title: 'Xin chào !!!',
            color: '#1296f6',
            autoClose: 2000,
            message: 'Chào mừng đến với quản trị của Chill And Free',
        });
    }, []);

    return <></>;
};

export default Dashboard;
