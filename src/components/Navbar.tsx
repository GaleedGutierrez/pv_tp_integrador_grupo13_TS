import { useAuthContext } from '@context/auth.context';
import { appRoutes } from '@routes/appRouters';
import { UserIcon } from '@ui/user';
import { type JSX } from 'react';
import { Link } from 'react-router';

interface Properties {
	/** A flag indicating whether the menu is open or not. */
	isMenuOpen: boolean;
}

/**
 * This component renders a navigation bar with links to different sections of the application.
 * @returns The rendered component with routes and a not found page.
 * */
export const Navbar = ({ isMenuOpen }: Properties): JSX.Element => {
	const { auth } = useAuthContext();
	const { isLoggedIn } = auth;

	return (
		<nav
			className={`${isMenuOpen ? 'block' : 'hidden'} fixed inset-x-0 top-18 z-1 w-full border-b border-gray-200 bg-white p-5 lg:static lg:block lg:w-fit lg:border-none lg:bg-transparent lg:p-0`}
		>
			<ul className="m-auto flex flex-col items-center justify-center gap-2 lg:m-0 lg:flex-row lg:items-start">
				{isLoggedIn ? (
					<>
						<li>
							<Link
								className="rounded-lg p-2 text-2xl hover:bg-gray-100 active:bg-transparent active:underline lg:text-base"
								to={appRoutes.private.home}
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								className="rounded-lg p-2 text-2xl hover:bg-gray-100 active:bg-transparent active:underline lg:text-base"
								to={appRoutes.private.favorites.list}
							>
								Favoritos
							</Link>
						</li>
						<li>
							<Link
								className="rounded-lg p-2 text-2xl hover:bg-gray-100 active:bg-transparent active:underline lg:text-base"
								to={appRoutes.private.products.routes.create}
							>
								+ Añadir Producto
							</Link>
						</li>
						<li>
							<button>
								<UserIcon size={20} />
							</button>
						</li>
					</>
				) : (
					<>
						<li>
							<Link
								className="rounded-lg p-2 text-2xl hover:bg-gray-100 active:bg-transparent active:underline lg:text-base"
								to={appRoutes.public.login}
							>
								Iniciar sesión
							</Link>
						</li>
						<li>
							<Link
								className="rounded-lg p-2 text-2xl hover:bg-gray-100 active:bg-transparent active:underline lg:text-base"
								to={appRoutes.public.register}
							>
								Registrarse
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};
