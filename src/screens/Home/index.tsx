import { useState } from 'react';
import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Participant } from '../../components/Participant';
import { styles } from './styles';

export function Home() {

  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');


  function handleAddParticipant() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante já existente", "Já existe um participante registrado com esse nome")
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleRemoveParticipant(name: string) {
    Alert.alert("Remover participante", `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name)),
      },
      {
        text: 'Não',
        style: 'cancel',
      }
    ])
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nome do participante"
        placeholderTextColor="#6B6B6B" 
        onChangeText={setParticipantName} 
        value={participantName}
       />

       <TouchableOpacity 
        style={styles.button} 
        onPress={handleAddParticipant}
      >
        <Text style={styles.buttonText}>
          +
        </Text>
       </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Nenhum participante foi registrado no evento ainda
          </Text>
        )}
        renderItem={( { item }) => (
          <Participant 
          name={item} 
          onRemove={() => handleRemoveParticipant(item)} 
        />
        )}
      />

    {/* <ScrollView showsVerticalScrollIndicator={false}>
      {participants.map(participant => (
        <Participant 
          key={participant} 
          name={participant} 
          onRemove={handleRemoveParticipant} 
        />
      ))}
    </ScrollView> */}
      
    </View>
  )
}