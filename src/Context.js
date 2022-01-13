import React, { createContext, useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, doc, query, addDoc, getDoc, getDocs, onSnapshot, updateDoc, deleteDoc, orderBy, limit, where } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const Context = createContext();

const ContextProvider = ({ children, auth, db }) => {
    const key = '517be800-a44b-4e49-a8ee-ed010029028c';
    const provider = new GoogleAuthProvider();
    const [isLoading, setIsLoading] = useState(false);
    const [navbarName, setNavbarName] = useState('...');
    const [currentUser, setCurrentUser] = useState(undefined);
    //putting the below states in context so that when user clicks off a page then back onto it, state values retain
    const [cardsPageNumber, setCardsPageNumber] = useState(1);
    const [setsPageNumber, setSetsPageNumber] = useState(1);
    const [searchPageNumber, setSearchPageNumber] = useState(1);
    const [totalCardsData, setTotalCardsData] = useState([]);
    const [totalSetsData, setTotalSetsData] = useState([]);
    const [totalSearchData, setTotalSearchData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [resultPageData, setResultPageData] = useState([]);
    const [resultPageAll, setResultPageAll] = useState([]);
    const [resultPageIndex, setResultPageIndex] = useState(0)
    
    const fetchApiData = async (apiType, pageNum = false, setState = false) => {
        try {
            setIsLoading(true);

            const response = await fetch(`https://api.pokemontcg.io/v2/${apiType}/`);
            const data = await response.json();

            const indexesObj = calcPageDataIndexes(pageNum);

            setState && setState(data.data.slice(indexesObj.startElementIndex, indexesObj.endElementIndex));
            setIsLoading(false);

            return data.data;
        } catch(error){
            console.log(error);
        }
    }

    const calcPageDataIndexes = (pageNumber) => {
        const startElementIndex = pageNumber === 1 ? pageNumber - 1 : (pageNumber - 1) * 100;
        const endElementIndex = pageNumber === 1 ? pageNumber * 100 : (pageNumber * 100) - 1; 

        return { startElementIndex, endElementIndex }
    }

    //login account with google account
    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch(error){
            console.log(error);
        }
    }

    //logout of account
    const logout = async () => {
        if(auth.currentUser){
            try {
                await signOut(auth);
            } catch(error) {
                console.log(error);
            }
        }
    }

    //check if a user already exist in the 'users' collection in firestore
    const checkUserAlreadyExists = async uid => {
        try {
            const allUsers = await readAllDocuments('users');
            const userAlreadyExists = allUsers ? allUsers.find(curr => curr.uid === uid) : false;

            return userAlreadyExists;
        } catch(error){
            console.log(error);
        }
    }

    //scroll to top of specified DOM element
    const scrollToTop = () => {
        //prevent .Page from being overlapped by .navbar; offset position from top by 100px (bc .navbar is 100px height); scrollIntoView() doesn't allow offset positioning
        document.querySelector('.App').scrollTo({
            top: document.querySelector('.Page').offsetTop - 100,
            behavior: 'smooth'
        });
    }

    //scroll to bottom of specified DOM element
    const scrollToBottom = () => {
        const element = document.querySelector('.App');

        //scrollTo after data updates; not immediately otherwise will scroll to just before added message/post
        setTimeout(() => {
            element.scrollTo({
                top: element.scrollHeight,
                behavior: 'smooth'
            });
        }, 500);
    }

    //template literals use the toString() method which by default joins the returned array by map with a 
    //https://stackoverflow.com/questions/45812160/unexpected-comma-using-map
    const createStringFromArray = inputArray => inputArray.map(curr => ` ${curr}`);  

    //CREATE
    const createDocument = async (collectionName, dataObj) => {
        try {
            const docRef = await addDoc(collection(db, collectionName), dataObj);

            return docRef.id;
        } catch(error){
            console.log(error);
        }
    }

    //READ
    const readDocument = async (collectionName, documentId) => {
        try {
            const document = await getDoc(doc(db, collectionName, documentId));

            return document.data();
        } catch(error){
            console.log(error);
        }
    }

    //READ WITHOUT SPECIFYING DOC ID
    const readDocumentWoId = async (collectionName) => {
        try {
            const response = await readAllDocuments(collectionName);

            //if collection name is 'users', return the currently signed in user's object in an array
            if(collectionName === 'users') return response.filter(curr => curr.uid === auth.currentUser.uid);

            return response;
        } catch(error){
            console.log(error);
        }
    }

    //READ ALL ONCE
    const readAllDocuments = async (collectionName, orderedBy = false, limit = false, includeId = true) => {
        try {
            let allDocuments;
            let returnArray = [];

            orderedBy ?
            (
                limit ?
                allDocuments = await getDocs(query(collection(db, collectionName), orderBy(orderedBy), limit(limit))) :
                allDocuments = await getDocs(query(collection(db, collectionName), orderBy(orderedBy)))
            ) :
            (
                limit ?
                allDocuments = await getDocs(query(collection(db, collectionName), limit(limit))) :
                allDocuments = await getDocs(query(collection(db, collectionName)))
            )

            includeId ?
            allDocuments.forEach(doc => returnArray.push({ 
                ...doc.data(),
                id: doc.id
            })) :
            allDocuments.forEach(doc => returnArray.push({ ...doc.data() }));

            return returnArray;
        } catch(error){
            console.log(error);
        }
    }

    //READ ALL ONSNAPSHOT
    // const readAllDocumentsOnSnapshot = (collectionName, orderedBy, setState = false, fieldKey = false, fieldValue = false) => { 
    //     //'query' method is used for specifying which documents you want to retrieve from a collection
    //     const messagesQuery = 
    //         fieldKey ? 
    //         query(collection(db, collectionName), where(fieldKey, '==', fieldValue), orderBy(orderedBy), limit(1000)) : 
    //         query(collection(db, collectionName), orderBy(orderedBy), limit(1000));

    //     //attaching a permanent listener that listens for realtime updates
    //     onSnapshot(messagesQuery, snapshot => {
    //         let returnArray = [];
            
    //         snapshot.forEach(doc => returnArray.push({
    //             ...doc.data(),
    //             id: doc.id 
    //         }))

    //         if(setState){
    //             setState(returnArray);
    //         } else {
    //             return returnArray;
    //         }
    //     });
    // }

    //READ DOCUMENT ONSNAPSNOT
    const readDocumentOnSnapshot = (collectionName, docId, setState) => {
        const firebaseQuery = query(collection(db, collectionName));

        onSnapshot(firebaseQuery, snapshot => {
            let returnArray = [];
            
            snapshot.forEach(doc => 
                docId === doc.id && 
                returnArray.push({
                    ...doc.data(),
                    id: doc.id 
                })
            )

            setState(returnArray[0]);
        });
    }

    //UPDATE
    const updateDocument = async (collectionName, documentId, key, value, overwriteField = true) => {
        try {
            let field = {};
            const existingDocumentData = await readDocument(collectionName, documentId);

            //assigning the 'key' parameter of this function, as the key for updating a field in the specified firestore document;
            //https://stackoverflow.com/questions/4244896/dynamically-access-object-property-using-variable
            overwriteField ?
            field[key] = value :
            field[key] = [...existingDocumentData[key], value];

            await updateDoc(doc(db, collectionName, documentId), field);
        } catch(error){
            console.log(error);
        }
    }

    //DELETE
    const deleteDocument = async (collectionName, documentId) => {
        try {
            await deleteDoc(doc(db, collectionName, documentId));
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => 
        onAuthStateChanged(auth, async user => {
            if(user){
                const { uid, displayName, email } = auth.currentUser;
                const doesUserAlreadyExist = await checkUserAlreadyExists(uid);
                
                if(!doesUserAlreadyExist){
                    //if registered via email, give the user a 'diplayName'; these properties already come with google accounts 
                    if(!displayName){
                        //doesn't cause state change of 'auth' object so doesn't rerender components that use 'auth'; 
                        await updateProfile(auth.currentUser, {
                            displayName: email.split('@')[0]
                        });

                        setNavbarName(auth.currentUser.email.split('@')[0]);
                    } else {
                        setNavbarName(displayName);
                    }

                    //add new user's document data containing default values where needed (desc,title...)
                    const docRefId = await createDocument('users', {
                        uid,
                        displayName: auth.currentUser.displayName,
                        email,
                        favouritesIds: [],
                    });

                    //adding document id to newly created document; if key doesn't exist, 'updateDoc' creates one
                    await updateDocument('users', docRefId, 'id', docRefId, true);
                } else {
                    setNavbarName(displayName);
                }
            } 
        })
    , [])

    return (
        <Context.Provider value={{ 
            auth,db,isLoading,navbarName,cardsPageNumber,totalCardsData,setsPageNumber,totalSetsData,searchData,searchQuery,totalSearchData,searchPageNumber,resultPageData,resultPageAll,
            resultPageIndex,loginWithGoogle,logout,scrollToTop,scrollToBottom,createDocument,readDocument,readDocumentWoId,readAllDocuments,updateDocument,deleteDocument,setIsLoading,
            fetchApiData,setCardsPageNumber,setTotalCardsData,setSetsPageNumber,setTotalSetsData,setSearchData,setSearchQuery,setTotalSearchData,setSearchPageNumber,calcPageDataIndexes,
            setResultPageData,setResultPageAll,setResultPageIndex,createStringFromArray,readDocumentOnSnapshot
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider; 