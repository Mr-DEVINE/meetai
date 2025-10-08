"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { data: session } = authClient.useSession() 

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      name,
      email,
      password,
    }, { 
      onError: () => {
        window.alert("Something went wrong");
      },
      onSuccess: () => {
        window.alert("User created successfully");
      }
    });
  }

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password,
    }, { 
      onError: () => {
        window.alert("Something went wrong");
      },
      onSuccess: () => {
        window.alert("User Logged In successfully");
      }
    });
  }

  if(session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <button onClick={() => authClient.signOut()}>
          sign out
        </button>
      </div>
    )
  }

  return(
      <div>
        <div className="p-4 flex flex-col gap-y-4">
        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={onSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
          Create User
        </button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={onLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
        LogIn
      </button>
    </div>
      </div>
  );
};
