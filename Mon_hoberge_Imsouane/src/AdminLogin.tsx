import React, { useState } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminAuth: React.FC = () => {
  const navigate=useNavigate();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [creationSuccess, setCreationSuccess] = useState<boolean>(false);

  const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#eef2f7',  // Couleur plus douce que #f5f5f5
    padding: '1rem',
  },
  form: {
    background: '#fff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '420px',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
    color: '#2d3748', // un peu plus sombre pour le titre
    fontWeight: '700',
    fontSize: '1.75rem',
    letterSpacing: '0.05em',
  },
  formGroup: {
    marginBottom: '1.75rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.6rem',
    color: '#4a5568',
    fontWeight: '600',
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.85rem 1rem',
    border: '1.5px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    color: '#2d3748',
    fontWeight: '400',
    // placeholder style inline requires CSS, can be handled with styled-components or similar
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#38a169',
    boxShadow: '0 0 8px rgba(56, 161, 105, 0.5)',
  },
  button: {
    width: '100%',
    padding: '0.85rem',
    backgroundColor: '#38a169',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 6px rgba(56, 161, 105, 0.4)',
  },
  buttonHover: {
    backgroundColor: '#2f855a',
    boxShadow: '0 6px 10px rgba(47, 133, 90, 0.6)',
  },
  secondaryButton: {
    width: '100%',
    padding: '0.85rem',
    backgroundColor: '#4a5568',
    color: '#e2e8f0',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    marginTop: '0.75rem',
    boxShadow: '0 4px 6px rgba(74, 85, 104, 0.4)',
  },
  secondaryButtonHover: {
    backgroundColor: '#2d3748',
    boxShadow: '0 6px 10px rgba(45, 55, 72, 0.6)',
  },
  error: {
    color: '#e53e3e',
    marginBottom: '1.25rem',
    padding: '0.75rem',
    backgroundColor: '#fff5f5',
    borderRadius: '6px',
    textAlign: 'center' as const,
    fontWeight: '600',
    fontSize: '0.95rem',
    boxShadow: '0 1px 4px rgba(229, 62, 62, 0.3)',
  },
  success: {
    textAlign: 'center' as const,
    padding: '2rem',
    color: '#2d3748',
    fontWeight: '600',
    fontSize: '1.1rem',
  },
  successMessage: {
    color: '#38a169',
    marginBottom: '1.25rem',
    padding: '0.75rem',
    backgroundColor: '#f0fff4',
    borderRadius: '6px',
    textAlign: 'center' as const,
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 1px 4px rgba(56, 161, 105, 0.3)',
  },
};


  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, login, password);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Échec de la connexion : ' + err.message);
    }
  };

  const handleCreateAccountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, newEmail, newPassword);
      setCreationSuccess(true);
      setTimeout(() => {
        setIsCreatingAccount(false);
        setCreationSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError('Erreur lors de la création du compte : ' + err.message);
    }
  };

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isSecondaryButtonHovered, setIsSecondaryButtonHovered] = useState(false);

  const getInputStyle = (isFocused: boolean) => ({
    ...styles.input,
    ...(isFocused ? styles.inputFocus : {})
  });

  if (isAuthenticated) {
    return (
      <div style={styles.success}>
        <h2>Connexion réussie !</h2>
        <p>Bienvenue {login}</p>
      </div>
    );
  }

  if (isCreatingAccount) {
    return (
      <div style={styles.container}>
        <form onSubmit={handleCreateAccountSubmit} style={styles.form}>
          <h2 style={styles.title}>Créer un compte</h2>
          {error && <div style={styles.error}>{error}</div>}
          {creationSuccess && (
            <div style={styles.successMessage}>
              Compte créé avec succès! Vous pouvez maintenant vous connecter.
            </div>
          )}
          <div style={styles.formGroup}>
            <label htmlFor="firstName" style={styles.label}>Prénom</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={getInputStyle(isInputFocused)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="lastName" style={styles.label}>Nom</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={getInputStyle(isInputFocused)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="newEmail" style={styles.label}>Email</label>
            <input
              id="newEmail"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={getInputStyle(isInputFocused)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="newPassword" style={styles.label}>Nouveau mot de passe</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={getInputStyle(isInputFocused)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={getInputStyle(isInputFocused)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isButtonHovered ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Créer le compte
          </button>
          <button
            type="button"
            style={{
              ...styles.secondaryButton,
              ...(isSecondaryButtonHovered ? styles.secondaryButtonHover : {}),
            }}
            onMouseEnter={() => setIsSecondaryButtonHovered(true)}
            onMouseLeave={() => setIsSecondaryButtonHovered(false)}
            onClick={() => {
              setIsCreatingAccount(false);
              setError('');
            }}
          >
            Retour à la connexion
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleLoginSubmit} style={styles.form}>
        <h4 style={styles.title}>Connexion</h4>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.formGroup}>
          <label htmlFor="login" style={styles.label}>Email</label>
          <input
            id="login"
            type="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={getInputStyle(isInputFocused)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={getInputStyle(isInputFocused)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(isButtonHovered ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Se connecter
        </button>
        {/* <button
          type="button"
          style={{
            ...styles.secondaryButton,
            ...(isSecondaryButtonHovered ? styles.secondaryButtonHover : {}),
          }}
          onMouseEnter={() => setIsSecondaryButtonHovered(true)}
          onMouseLeave={() => setIsSecondaryButtonHovered(false)}
          onClick={() => {
            setIsCreatingAccount(true);
            setError('');
          }}
        >
          Créer un compte
        </button> */}
      </form>
    </div>
  );
};

export default AdminAuth;
