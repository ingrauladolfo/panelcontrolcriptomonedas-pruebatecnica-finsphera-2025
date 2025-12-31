import { useLayoutEffect, useState, useRef, useEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button, Card, Modal } from '@/common/components';
import { useUserDetailsStore } from '@/common/stores/pages/Dashboard/Users/UserDetails';
import { FaChevronLeft, FaUser } from 'react-icons/fa6';

export const DashboardUserDetails: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, loading, getUser, resetUser, messages, getMessages, formatMessagesDate, formatDate, getGenderLabel, getCountryName, getFullAddress, handleCopyCoordinates, formatTimePeriod } = useUserDetailsStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement | null>(null);

    const [showCopyModal, setShowCopyModal] = useState(false);
    const [copyMessage, setCopyMessage] = useState('');

    const resolveId = (): string | null => {
        const sp = new URLSearchParams(location.search);
        return sp.get('id');
    };

    const id = resolveId();

    useLayoutEffect(() => {
        if (id) {
            getUser(id);
            getMessages(id);
        }
    }, [id, getUser, getMessages]);

    useLayoutEffect(() => { return () => { resetUser(); }; }, [resetUser]);
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!menuRef.current) { return; }
            if (!(e.target instanceof Node)) { return; }
            if (!menuRef.current.contains(e.target)) { setMenuOpen(false); }
        };
        const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
        const onScroll = () => setMenuOpen(false);
        window.addEventListener('click', onDocClick);
        window.addEventListener('keydown', onEsc);
        window.addEventListener('scroll', onScroll, true);
        return () => {
            window.removeEventListener('click', onDocClick);
            window.removeEventListener('keydown', onEsc);
            window.removeEventListener('scroll', onScroll, true);
        };
    }, []);

    const formatCoordinates = (loc?: any) => {
        const lat = loc?.coordinates?.latitude ?? '';
        const lon = loc?.coordinates?.longitude ?? '';
        const nLat = String(lat).replace(/[^\d\.\-]/g, '');
        const nLon = String(lon).replace(/[^\d\.\-]/g, '');
        return `${nLat}, ${nLon}`;
    };

    const onAddressContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuPos({ x: e.clientX, y: e.clientY });
        setMenuOpen(true);
    };

    const onCopyClick = async () => {
        const coords = formatCoordinates(user?.location);
        const ok = await handleCopyCoordinates(coords);
        if (ok) {
            setCopyMessage('Copiado en el portapapeles');
        } else {
            setCopyMessage('No se pudo copiar las coordenadas');
        }
        setMenuOpen(false);
        setShowCopyModal(true);
    };

    if (!id) return <div className="error-message">No se encontró el ID del usuario</div>;
    if (loading) return <div className="loading-message">Cargando usuario...</div>;
    if (!user) return <div className="error-message">No se encontró el usuario con id: <strong>{id}</strong></div>;

    return (
        <div className="flex flex-wrap gap-6 items-start justify-center w-full box-border max-[980px]:flex-col max-[980px]:gap-4 user-details-grid ">
            {/* Header centered */}
            <div className="flex items-center justify-center w-full text-center mb-5 gap-2.5">
                <FaUser className="text-[24px] text-[#d1d1d1]" />
                <h1 className="text-[24px] text-[#d1d1d1] m-0">Detalle de {user?.name?.title} {user?.name?.first} {user?.name?.last}</h1>
            </div>

            {/* Left: detalle */}
            <div className="flex-1 basis-0 grow max-w-140 min-w-70 max-[980px]:max-w-full max-[980px]:min-w-0">
                <Card type="detail" className='w-full' data={user}>
                    <p>Género: {getGenderLabel(user?.gender)}</p>
                    <p>Fecha: {formatDate(user?.dob?.date)}</p>
                    <p>Edad: {formatTimePeriod(user?.dob?.age)}</p>
                    <p>Nacionalidad: {getCountryName(user.nat)}</p>
                    <p>Email: {user?.email}</p>
                    <p>Teléfono: {user?.phone}</p>
                    <p>Celular: {user?.cell}</p>
                    <p>Dirección:<span onContextMenu={onAddressContextMenu} title="Click derecho para ver opciones" aria-label="Dirección del usuario"> {getFullAddress(user?.location)}</span></p>
                    <p>Fidelidad: {formatTimePeriod(user?.registered?.age)}</p>
                    <p>Miembro desde: {formatDate(user?.registered?.date)} </p>
                </Card>
            </div>

            {/* Right: historial de mensajes (si existen) */}
            {messages && messages.length > 0 && (
                <div className="flex-1 basis-0 grow max-w-140 min-w-70 max-[980px]:max-w-full max-[980px]:min-w-0">
                    <Card type="detail" data={user} title={`Historial de mensajes con ${user.name?.title ?? ''} ${user.name?.first ?? ''} ${user.name?.last ?? ''}`}>
                        <div className="flex flex-col gap-3 pt-2 max-h-110 overflow-auto max-[980px]:max-h-80">
                            {messages.map((m: any, idx: number) => (
                                <div className="bg-[#f1f5f9] rounded-xl py-2.5 px-3 shadow-[0 1px 2px rgba(2, 6, 23, 0.06)] border border-[#0f172a0a] flex flex-col justify-between" key={idx}>
                                    <div className="font-bold text-[13px] text-[#0f172a] mb-4 message-title">Asunto: {m.title}</div>
                                    <div className="text-[14px] text-[#111827] mb-4 whitespace-pre-wrap break-[break-word]">{m.content}</div>
                                    <div className="text-[12px] text-[#6b7280] self-end">Enviado el {formatMessagesDate(m.date)}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* button row */}
            <div className="basis-full order-99 flex justify-center items-center mt-5 box-border max-[980px]:order-99 max-[980px]:basis-full">
                <Button type="button" className="bg-[#3e8e41] py-2.5 px-5 border-none cursor-pointer w-fit!" onClick={() => navigate(-1)}>
                    <FaChevronLeft /> Regresar
                </Button>
            </div>

            {/* custom context menu */}
            {menuOpen && (
                <div ref={menuRef} className="fixed z-2000 min-w-55 bg-[#d1d1d1] text-[#111827] rounded-md shadow-[0 6px 20px rgba(0, 0, 0, 0.18)] border border-[#0f172a0f] p-2 origin-top-left max-[480px]:min-w-45 max-[480px]:text-[13px] custom-context-menu" style={{ left: menuPos.x, top: menuPos.y }} role="menu"                >
                    <div className="text-[13px] mt-1" onClick={onCopyClick}>
                        {formatCoordinates(user?.location)}
                    </div>
                </div>
            )}

            {/* modal feedback after copy */}
            {showCopyModal && (<Modal message={copyMessage} onClose={() => setShowCopyModal(false)} onConfirm={() => setShowCopyModal(false)} confirmText="Aceptar" />)}
        </div>
    );
};
