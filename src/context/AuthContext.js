"use client";

import { auth } from "../config/firebase";
import React, { useContext, useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { addDocument, getDocument } from "@/config/firestore";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const value = {
    user,
    signup,
    login,
    logout,
    resetPassword,
    loading,
    userData,
    setUserData,
    checkPassword,
    changeEmail,
    changePassword,
  };

  // Checks if provided password matches the current user's password

  async function checkPassword(password) {
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (err) {
      return false;
    }
  }

  // Changes the current user's password

  async function changePassword(password) {
    return await updatePassword(auth.currentUser, password);
  }

  // Changes the current user's email

  async function changeEmail(email) {
    return await updateEmail(auth.currentUser, email);
  }

  // Creates an account with the provided information and adds the user to the database

  async function signup(teamName, teamEmail, password, school) {
    return await createUserWithEmailAndPassword(auth, teamEmail, password).then(
      async () => {
        await updateProfile(auth.currentUser, {
          displayName: teamName,
        });
        await addDocument(
          ["users"],
          {
            team_name: teamName,
            school: school,
            email: teamEmail,
            contests: [],
            created_at: serverTimestamp(),
          },
          auth.currentUser.uid
        );
      }
    );
  }

  // Logs in the user with the provided information

  async function login(teamEmail, password) {
    return await signInWithEmailAndPassword(auth, teamEmail, password);
  }

  // Logs out the current user

  async function logout() {
    return await signOut(auth);
  }

  // Sends a password reset email to the provided email

  async function resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userData = await getDocument(["users"], user.uid);
        setUserData(userData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;
