import { useAction } from '@/hooks';
import Alert from '@/ui/alert/alert';
import { Logout } from 'icons';
const LogoutAlert = ({ navigation }) => {
    const { logout } = useAction();
    return (<Alert icon={Logout} description='Are you sure you want to logout?' acceptText='Logout' type='danger' onClose={() => navigation?.goBack()} onAccept={logout}/>);
};
export default LogoutAlert;
//# sourceMappingURL=logout-dialog.js.map