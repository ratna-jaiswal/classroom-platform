// Test script to verify backend API functionality
const baseUrl = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing Backend API Endpoints...\n');

  // Test 1: Test registration endpoint
  console.log('1. Testing Registration Endpoint...');
  try {
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'TestPass123',
        role: 'student'
      }),
    });

    const registerData = await registerResponse.json();
    console.log('✅ Registration Response:', registerData);
    console.log('Status:', registerResponse.status);
  } catch (error) {
    console.log('❌ Registration Error:', error.message);
  }

  console.log('\n---\n');

  // Test 2: Test login endpoint
  console.log('2. Testing Login Endpoint...');
  try {
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'TestPass123'
      }),
    });

    const loginData = await loginResponse.json();
    console.log('✅ Login Response:', loginData);
    console.log('Status:', loginResponse.status);
  } catch (error) {
    console.log('❌ Login Error:', error.message);
  }

  console.log('\n---\n');

  // Test 3: Test invalid endpoint (should return 404)
  console.log('3. Testing Invalid Endpoint...');
  try {
    const invalidResponse = await fetch(`${baseUrl}/api/nonexistent`, {
      method: 'GET',
    });

    console.log('✅ Invalid Endpoint Status:', invalidResponse.status);
    console.log('Expected: 404');
  } catch (error) {
    console.log('❌ Invalid Endpoint Error:', error.message);
  }
}

// Run the tests
testAPI();