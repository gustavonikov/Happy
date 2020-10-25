import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../services/api';
import localIcon from '../images/Local.png';

interface Orphanage {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}

export default function OrphanageMap() {
	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const navigation = useNavigation();

	useFocusEffect(() => {
		api.get('orphanages').then(res => {
			setOrphanages(res.data);
		});
	});

    function handleNavigationToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id })
    }

	function handleNavigationToCreateOrphanage() {
        navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE} 
				style={styles.map} 
				initialRegion={{
					latitude: -7.069570,
					longitude: -34.841253,
					latitudeDelta: 0.009,
					longitudeDelta: 0.009,
				}} 
			>
				{
					orphanages.map(orphanage => {
						return (
							<Marker
								key={orphanage.id}
								icon={localIcon}
								calloutAnchor={{
									x: 0.5,
									y: -0.2,
								}}
								coordinate={{
									latitude: orphanage.latitude,
									longitude: orphanage.longitude,
								}}
							>
								<Callout tooltip onPress={() => handleNavigationToOrphanageDetails(orphanage.id)} >
									<View style={styles.calloutContainer}>
										<Text style={styles.calloutText}>{orphanage.name}</Text>
									</View>
								</Callout>
							</Marker>
						);
					})
				}
				
					
			</MapView>

			<View style={styles.footer}>
				<Text style={styles.footerText}>
					{orphanages.length} orfanatos encontrados
				</Text>
				<RectButton
					style={styles.createOrphanageButton}
					onPress={handleNavigationToCreateOrphanage}
				>
					<Feather name="plus" size={20} color="#fff" />
				</RectButton>
			</View>
		</View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    },
    
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},

	calloutContainer: {
		width: 'auto',
		height: 40,

		paddingHorizontal: 16,

		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		
		borderRadius: 16,

		justifyContent: 'center',
	},

	calloutText: {
		color: '#0089a5',
		fontSize: 16,
		fontFamily: 'Nunito_700Bold',
	},

	footer: {
		position: 'absolute',
		left: 24,
		right: 24,
		bottom: 32,
		height: 56,

		backgroundColor: '#fff',

		borderRadius: 20,
		paddingLeft: 24,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		elevation: 3,
	},

	footerText: {
		color: '#8fa7b3',

		fontFamily: 'Nunito_700Bold'
	},

	createOrphanageButton : {
		width: 56,
		height: 56,
		backgroundColor: '#15c3d6',
		borderRadius: 20,

		justifyContent: 'center',
		alignItems: 'center',
    }, 
});
