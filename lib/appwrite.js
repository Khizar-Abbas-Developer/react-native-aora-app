import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "aora-react-native-app",
  projectId: "6738982a0026121e3599",
  databaseId: "67389b92002a09247ef4",
  userCollectionId: "67389bb2001ae094ac6f",
  videoCollectionId: "67389bee0021cc3872f2",
  storageId: "67389cf600353bf610e8",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

//SDK Completed

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async ({ username, email, password }) => {
  try {
    const newAccounts = await account.create(
      ID.unique(), // Unique user ID
      email, // User email
      password // User password
    );

    if (!newAccounts) throw new Error("Failed to create account");
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: (await newAccounts).$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// Login User

export const signIn = async ({ email, password }) => {
  try {
    // Check if a session already exists
    const currentSession = await account.getSession("current");
    if (currentSession) {
      return currentSession; // Use the existing session
    }
  } catch {
    // No active session found, proceed to create a new session
  }

  // Create a new session if none exists
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch {
    throw new Error("Failed to create session");
  }
};
