export async function post(request: any) {
    const { username, password } = request.body
  
    if (username === 'admin' && password === 'password') {
        return {
            status: 401,
            body: { message: 'Invalid username or password' }
        }

    } else {
        return {
            status: 200,
            body: { message: 'Login successful' }
        }
    }
}