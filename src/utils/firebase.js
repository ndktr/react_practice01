import { db } from '../firebase/config';
import { collection, serverTimestamp, query, orderBy, where, doc, getDocs, getDoc, addDoc, setDoc, updateDoc } from 'firebase/firestore';

// 総じてエラー処理をどうにかしたい

export const fetchTodos = async () => {
    try {
        const collectionRef = collection(db, 'todos');
        const q = query(collectionRef, where('isDeleted', '==', false), orderBy('created', 'desc'));
        const fetchData = [];
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            const data = {...doc.data(), id: doc.id};
            fetchData.push(data);
        });
        return fetchData;
    } catch (error) {
        console.log('Error fetch todo:', error)
        return false;
    };
};

export const fetchTodo = async id => {
    try {
        const todoDocRef = doc(db, 'todos', id);
        const docSnap = await getDoc(todoDocRef);
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            console.log('Todo not found');
            return false;
        }
    } catch (error) {
        console.log('Error fetch todo:', error);
        return false;
    };
};

export const addTodo = async (title, desc, category, todoStart, todoEnd) => {
    try {
        const collectionRef = collection(db, 'todos');
        const docRef = await addDoc(collectionRef, {
            status: 'new',
            title: title.trim(),
            description: desc.trim(),
            category: category.trim(),
            start: new Date(todoStart),
            end: new Date(todoEnd),
            isDeleted: false,
            created: serverTimestamp(),
            updated: serverTimestamp()
        })
        return docRef;
    } catch (error) {
        console.log('Error add todo:', error)
        return false;
    };
};

export const updateTodo = async (id, status, title, desc, category, todoStart, todoEnd) => {
    try {
        const todoDocRef = doc(db, 'todos', id);
        const docRef = await setDoc(todoDocRef, {
            status: status.trim(),
            title: title.trim(),
            description: desc.trim(),
            category: category.trim(),
            start: new Date(todoStart),
            end: new Date(todoEnd),
            isDeleted: false,
            created: serverTimestamp(),
            updated: serverTimestamp()
        })
        return docRef;
    } catch (error) {
        console.log('Error update todo:', error)
        return false;
    };
};

export const deleteTodo = async id => {
    try {
        const todoDocRef = doc(db, 'todos', id);
        const docRef = await updateDoc(todoDocRef, {
            isDeleted: true
        })
        return docRef;
    } catch (error) {
        console.log('Error delete todo:', error)
        return false;
    };
};