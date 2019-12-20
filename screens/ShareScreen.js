import React, { Component } from 'react';
import { Share, Button } from 'react-native';


export default class ShareScreen extends Component {
    onShare = async () => {
        try {
            const result = await Share.share({
                title: 'Subject',
                message: 'Başağrısı Günlüğü Aylık Kayıtlar',

            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    render() {
        return <Button onPress={this.onShare} title="Paylaş" />;
    }
}