/* eslint-disable jsx-a11y/anchor-is-valid */
import ApplePayBadege from '@assets/icons/badge-apple-pay.svg?react';
import GooglePayBadge from '@assets/icons/badge-google-pay.svg?react';
import MasterCardBadge from '@assets/icons/badge-mastercard.svg?react';
import PayPalBadge from '@assets/icons/badge-paypal.svg?react';
import VisaBadge from '@assets/icons/badge-visa.svg?react';
import type { JSX } from 'react';
import { Link } from 'react-router';

import { FacebookIcon } from './ui/facebook';
import { GithubIcon } from './ui/github';
import { InstagramIcon } from './ui/instagram';
import { TwitterIcon } from './ui/twitter';

export const Footer = (): JSX.Element => (
	<footer className="lg:py- bg-gray-100 px-4 py-17 lg:px-6">
		<div className="md:grid md:grid-cols-[auto_1fr] md:gap-20 lg:gap-28">
			<div className="max-w-3xs">
				<div>
					<h2>Shop.co</h2>
					<p className="mt-4 text-gray-700">
						Tenemos ropa que se adapta a tu estilo y que te
						enorgullece llevar. De mujer a hombre.
					</p>
				</div>
				<div className="my-5 flex gap-3">
					<TwitterIcon />
					<FacebookIcon />
					<InstagramIcon />
					<Link
						rel="noopener noreferrer"
						target="_blank"
						title="Repositorio de GitHub"
						to="https://github.com/GaleedGutierrez/pv_tp_integrador_grupo13"
					>
						<GithubIcon />
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-10 lg:justify-items-center">
				<div>
					<h3 className="font-primary text-lg font-bold">Compañía</h3>
					<div className="flex flex-col gap-3">
						<a href="#">Acerca de nosotros</a>
						<a href="#">Reportaje</a>
						<a href="#">Trabajos</a>
						<a href="#">Trajectoria</a>
					</div>
				</div>
				<div>
					<h3 className="font-primary text-lg font-bold">Ayuda</h3>
					<div className="flex flex-col gap-3">
						<a href="#">Atención al cliente</a>
						<a href="#">Seguimiento de envió</a>
						<a href="#">Términos y condiciones</a>
						<a href="#">Política de privacidad</a>
					</div>
				</div>
				<div>
					<h3 className="font-primary text-lg font-bold">FAQ</h3>
					<div className="flex flex-col gap-3">
						<a href="#">Cuenta</a>
						<a href="#">Envíos</a>
						<a href="#">Pedidos</a>
						<a href="#">Pagos</a>
					</div>
				</div>
				<div>
					<h3 className="font-primary text-lg font-bold">Recursos</h3>
					<div className="flex flex-col gap-3">
						<a href="#">E-book gratis</a>
						<a href="#">Tutorial para desarrollo</a>
						<a href="#">Blog</a>
						<a href="#">Playlist de YouTube</a>
					</div>
				</div>
			</div>
		</div>
		<div className="mt-10 flex flex-col items-center gap-4 border-t-1 border-gray-400 pt-4 lg:flex-row lg:justify-between">
			<h4>Shop.co © 2000-2023, All Rights Reserved</h4>
			<div className="flex max-w-md items-center justify-center gap-2">
				<VisaBadge className="w-full" />
				<MasterCardBadge className="w-full" />
				<PayPalBadge className="w-full" />
				<GooglePayBadge className="w-full" />
				<ApplePayBadege className="w-full" />
			</div>
		</div>
	</footer>
);
