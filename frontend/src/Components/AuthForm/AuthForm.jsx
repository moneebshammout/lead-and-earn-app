import { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import { login, signup } from '../../Service/auth.service';
import { viewReferralLink } from '../../Service/referral.service';
import { useHistory } from 'react-router-dom';
/**
 * Authentication Form component
 * @param {object} props
 *
 * @returns {JSX.Element} Authentication Form component
 */
function AuthForm(props) {
  //create referral link view
  const { source } = props.match.params;
  useEffect(() => {
    if (source) {
      viewReferralLink(source);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentTab, setActiveTab] = useState('tab1');
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
  });

  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    image: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleTabClick = (value) => {
    refreshErrors();
    if (value === currentTab) {
      return;
    }
    setActiveTab(value);
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInForm({ ...signInForm, [name]: value });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  const setError = (field, message) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: message }));
  };

  const refreshErrors = () => {
    setError('email', '');
    setError('password', '');
    setError('name', '');
    setError('phone', '');
    setError('image', '');
    setError('exception', '');
  };

  const validateEmailAndPassword = (email, password) => {
    const isEmailValid = (email) => {
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
      // Minimum password length requirement
      const minLength = 8;

      // Password must contain at least one letter and one number
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

      return password.length >= minLength && passwordRegex.test(password);
    };

    if (!isEmailValid(email)) {
      setError('email', 'Invalid email format');
      return false;
    }
    if (!isPasswordValid(password)) {
      setError(
        'password',
        'Password must be at least 8 characters long and contain both letters and numbers'
      );
      return false;
    }
    refreshErrors();
    return true;
  };

  const validateSignUpForm = () => {
    //validate name
    refreshErrors();

    if (signUpForm.name.length < 3) {
      setError('name', 'Name must be at least 3 characters long');
      return false;
    }

    const isValid = validateEmailAndPassword(
      signUpForm.email,
      signUpForm.password
    );
    if (!isValid) return false;
    //validate image must 5mb max and only image
    if (signUpForm.image.size > 5 * 1024 * 1024) {
      setError('image', 'Image must be 5mb max');
      return false;
    }
    if (!signUpForm.image.type.startsWith('image')) {
      setError('image', 'Only image allowed');
      return false;
    }

    //validate phone
    if (signUpForm.phone.length < 10) {
      setError('phone', 'Phone number must be at least 10 characters long');
      return false;
    }

    return true;
  };

  const handleAfterAuth = (response) => {
    if (response.token) {
      history.push('/');
      return;
    }
    let errorMessage = '';
    console.log(response);
    Object.entries(response).map(([key, value]) => {
      errorMessage += `${key} ${value}`;
    });
    setError('exception', errorMessage);
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    // Perform validation and sign-in logic here
    const isValid = validateEmailAndPassword(
      signInForm.email,
      signInForm.password
    );

    if (!isValid) return;
    setIsLoading(true);
    const response = await login(signInForm);
    handleAfterAuth(response);
    setIsLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Perform validation and sign-up logic here
    const isValid = validateSignUpForm();
    if (!isValid) return;
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', signUpForm.name);
    formDataToSend.append('email', signUpForm.email);
    formDataToSend.append('image', signUpForm.image);
    formDataToSend.append('birthdate', signUpForm.birthdate);
    formDataToSend.append('password', signUpForm.password);
    formDataToSend.append('phone', signUpForm.phone);

    //adding referral link source to create lead after signup

    if (source) {
      formDataToSend.append('source', source);
    }

    const response = await signup(formDataToSend);
    handleAfterAuth(response);
    setIsLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSignUpForm({ ...signUpForm, image: file });
  };

  return (
    <>
      {isLoading ? <LoadingOverlay /> : null}
      <MDBContainer
        className="auth-card p-4 my-5 d-flex flex-column mx-auto"
        style={{ maxWidth: '600px' }}
      >
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleTabClick('tab1')}
              active={currentTab === 'tab1'}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleTabClick('tab2')}
              active={currentTab === 'tab2'}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={currentTab === 'tab1'}>
            <form onSubmit={handleSignIn}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
                name="email"
                value={signInForm.email}
                onChange={handleSignInChange}
                required
                error={errors['email']}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                name="password"
                value={signInForm.password}
                onChange={handleSignInChange}
                required
                error={errors['password']}
              />
              {errors['password'] && (
                <div className="alert alert-danger">{errors['password']}</div>
              )}
              {errors['email'] && (
                <div className="alert alert-danger">{errors['email']}</div>
              )}
              {errors['exception'] && (
                <div className="alert alert-danger">{errors['exception']}</div>
              )}
              <MDBBtn className="mb-4 w-100" type="submit">
                Sign in
              </MDBBtn>
            </form>
          </MDBTabsPane>

          <MDBTabsPane show={currentTab === 'tab2'}>
            <form onSubmit={handleSignUp}>
              <MDBInput
                wrapperClass="mb-4"
                label="Name"
                id="form1"
                type="text"
                name="name"
                value={signUpForm.name}
                onChange={handleSignUpChange}
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form1"
                type="email"
                name="email"
                value={signUpForm.email}
                onChange={handleSignUpChange}
                error={errors['email']}
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form1"
                type="password"
                name="password"
                value={signUpForm.password}
                onChange={handleSignUpChange}
                error={errors['password']}
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Birthdate"
                id="form1"
                type="date"
                name="birthdate"
                value={signUpForm.birthdate}
                onChange={handleSignUpChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Image"
                id="form1"
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Phone"
                id="form1"
                type="tel"
                name="phone"
                value={signUpForm.phone}
                onChange={handleSignUpChange}
                required
              />

              {errors['password'] && (
                <div className="alert alert-danger">{errors['password']}</div>
              )}
              {errors['email'] && (
                <div className="alert alert-danger">{errors['email']}</div>
              )}
              {errors['name'] && (
                <div className="alert alert-danger">{errors['name']}</div>
              )}
              {errors['phone'] && (
                <div className="alert alert-danger">{errors['phone']}</div>
              )}
              {errors['image'] && (
                <div className="alert alert-danger">{errors['image']}</div>
              )}

              {errors['exception'] && (
                <div className="alert alert-danger">{errors['exception']}</div>
              )}

              <MDBBtn className="mb-4 w-100" type="submit">
                Sign up
              </MDBBtn>
            </form>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </>
  );
}

export default AuthForm;
