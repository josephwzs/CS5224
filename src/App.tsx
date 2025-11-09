import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { PageNotFound } from "./components/pages/common/page-not-found";
import HomePage from "./components/pages/common/home";
import { Route, Routes } from "react-router-dom";
import OnboardingPage from "./components/pages/common/onboarding";
import LoginPage from "./components/pages/common/login";
import SignUpPage from "./components/pages/common/sign-up";
import VerifyEmailPage from "./components/pages/common/verify-email";

const client = generateClient<Schema>();

function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route element={<ProtectedRoute />}> */}
      {/* </Route> */}
    </Routes>
  );
}

export default App;
