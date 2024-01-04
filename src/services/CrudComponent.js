    import { db, collection, getDocs, query, where, addDoc } from './firebaseConfig'; 
    import hashPassword from '../util/hashingPassword';
    import comparePasswords  from '../util/userHashedPasswordMatcher';

    const CRUDComponent = (props) => {

        const fetchData = async (setData) => {
            console.log("fetchData used")
            try {
                // Reference to the Firestore collection 'movie_app_users'
                const usersCol = collection(db, 'movie_app_users');

                // Fetch all documents in the 'movie_app_users' collection
                const usersSnapshot = await getDocs(usersCol);

                // Extract data from each document in the snapshot and create an array
                const usersList = usersSnapshot.docs.map(doc => doc.data());
                
                // return the list of movie app users
                return usersList;
                
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        const handleLogin = async (username, enteredPassword, toggleSession,setShowLoginErrorMesage,setCurrentUser,resetFormRelatedState) => {
            try {
                const movie_app_users_col = collection(db, 'movie_app_users');
            
                const q = query(movie_app_users_col, where('username', '==', username));
            
                const querySnapshot = await getDocs(q);
            
                if (!querySnapshot.empty) {
                    const user = querySnapshot.docs[0].data();
                    const storedHashedPassword = user.password;

                    // Compare the entered password with the stored hashed password
                    const isMatch = await comparePasswords(enteredPassword, storedHashedPassword);

                    if (isMatch) {
                        // Passwords match: User authentication successful
                        console.log('Successful login')
                        toggleSession();
                        setShowLoginErrorMesage('');
                        setCurrentUser(user.username);
                        resetFormRelatedState();
                    } else {
                        // Passwords don't match: Handle invalid password
                        setShowLoginErrorMesage('Incorrect password');
                    }
                } else {
                    // Handle case when no user exists with the given username
                    setShowLoginErrorMesage('No user found with the provided username.');
                }
            } catch (error) {
                console.error('Error logging in: ', error);
                // Handle login error
            }
        };



        // Create data in Firestore
        const addData = async (formData,date_registered,setUsersUsernameList,setUsersEmailList,setSuccessfulMessage) => {
            console.log("addData from Crudcompnent.js being use");
            try {
                // Add a new document to the 'users' collection
                const usersCol = collection(db, 'movie_app_users');
            
                // Capture form data
                const { email, username, password} = formData;

                const hashInputPassword = await hashPassword(password);
            
                // Add new document with form data
                await addDoc(usersCol, {
                    'email' :email,
                    'username': username,
                    'password': hashInputPassword,
                    'date_registered': date_registered
                });

                const allUsers = await fetchData();
    
                const allEmail = allUsers.map(user => user.email);
                const allUsername = allUsers.map(user => user.username);
                
                //save in the state the newly added user's name and email
                setUsersUsernameList(allUsername);
                setUsersEmailList(allEmail);

                //Display Succesful Message
                setSuccessfulMessage(true);

            } catch (error) {
                console.error('Error adding data: ', error);
            }
        };
    
        return ({
            addData,
            handleLogin,
            fetchData
            });
        ;
    };

    export default CRUDComponent;
