import AuthPage from "../AuthPage/AuthPage";
import CreateImagePage from "../CreateImagePage/CreateImagePage";
import ImageHistoryPage from "../ImageHistoryPage/ImageHistoryPage";
import ImageDetailPage from "../ImageDetailPage/ImageDetailPage";
import ImageDeletePage from "../ImageDeletePage/ImageDeletePage";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ? <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<CreateImagePage user={user} />}/>
          <Route path="/images" element={<ImageHistoryPage />}/>
          <Route path="/image/:id" element={<ImageDetailPage />}/>
          <Route path="/image/delete/:id" element={<ImageDeletePage />}/>
        </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );

}

export default App;


