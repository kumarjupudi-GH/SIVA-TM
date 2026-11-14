import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { FamilyBuddy, ProductDetail } from './pages/FamilyBuddy';
import FinancialPlanning from './pages/FinancialPlanning';
import WealthManagement from './pages/WealthManagement';
import { Academy, PathwayDetail } from './pages/Academy';
import Launchpad from './pages/Launchpad';
import InnovationLab from './pages/InnovationLab';
import About from './pages/About';
import Community from './pages/Community';
import Contact from './pages/Contact';
import { Privacy, Terms } from './pages/Legal';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="familybuddy" element={<FamilyBuddy />} />
        <Route path="familybuddy/:slug" element={<ProductDetail />} />
        <Route path="financial-planning" element={<FinancialPlanning />} />
        <Route path="wealth-management" element={<WealthManagement />} />
        <Route path="academy" element={<Academy />} />
        <Route path="academy/:slug" element={<PathwayDetail />} />
        <Route path="launchpad" element={<Launchpad />} />
        <Route path="innovation-lab" element={<InnovationLab />} />
        <Route path="about" element={<About />} />
        <Route path="community" element={<Community />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
