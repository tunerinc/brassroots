import AsyncStorage from "@react-native-community/async-storage";

export async function persistSession(userID, session, owner) {
    await AsyncStorage.multiSet(['userID', userID], ['session', JSON.stringify(session)], ['owner', JSON.stringify(owner)]);
    console.log("stored");
}

module.exports = persistSession;