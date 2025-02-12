type AuthEventListener = () => void

class AuthStateManager {
  private static listeners: AuthEventListener[] = []

  static subscribe(listener: AuthEventListener): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  static notifyAuthError(): void {
    this.listeners.forEach((listener) => listener())
  }
}

export default AuthStateManager

