// DashboardUsers.tsx
import { useLayoutEffect, type FC } from 'react';
import { Card, Button, Pagination, NullResults } from "@/common/components";
import { useUsersStore } from '@/common/stores/pages/Dashboard/Users';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { FaUsers } from 'react-icons/fa6';
import { itemsPerPageOptions, textUsers } from '@/assets/data';
import { useLanguage } from '@/common/context';

export const DashboardUsers: FC = () => {
    const { users, getUsers, getNationalities, currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange, renderPageNumbers, nationalities, gender, nationality, age, handleGenderChange, handleNationalityChange, handleAgeChange, resetFilters, handleExportCSV, handleDeleteUser, handleViewUser, handleExportUserCSV } = useUsersStore();
    const navigate = useNavigate();
    const { lang } = useLanguage();

    const t = textUsers[lang] || textUsers.en;
    useLayoutEffect(() => {
        getUsers();
        getNationalities();
    }, [getUsers, getNationalities]);

    const filteredUsers = users.filter(user => {
        let isValid = true;
        if (gender && user.gender !== gender) isValid = false;
        if (nationality && user.nat !== nationality) isValid = false;
        if (age && user.dob.age !== age) isValid = false;
        return isValid;
    });

    const pages = Math.ceil(filteredUsers.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const hasFilters = gender !== '' || nationality !== '' || age !== 0;

    return (
        <div className="flex flex-col items-center p-5">
            <div className="flex items-center mb-5">
                <FaUsers className="text-[24px] text-[#d1d1d1] mr-2.5" />
                <h1 className="text-[24px] text-[#d1d1d1] m-0 ">{t.title}</h1>
            </div>
            <div className="flex flex-wrap justify-center mb-2.5">
                <select id='select-gender' className="m-2.5 p-2.5 border border-[#ccc] rounded-[5px] bg-[#333] text-[#d1d1d1] text-[16px] w-50 focus: outline-none focus:border-[#666] focus:shadow-[0 0 1 #666]" value={gender} onChange={handleGenderChange}>
                    <option value="">Género</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                </select>

                <select id='select-nationality' className="m-2.5 p-2.5 border border-[#ccc] rounded-[5px] bg-[#333] text-[#d1d1d1] text-[16px] w-50 focus: outline-none focus:border-[#666] focus:shadow-[0 0 1 #666]" value={nationality} onChange={handleNationalityChange}>
                    <option className='' value="">Nacionalidad</option>
                    {nationalities.map(nat => (
                        <option className='' key={nat} value={nat}>{nat}</option>
                    ))}
                </select>

                <div className="flex">
                    <span>0</span>
                    <input type="range" className="dashboard-users-filter m-2.5 p-2.5 border border-[#ccc] rounded-[5px] bg-[#333] text-[#d1d1d1] text-[16px] w-50 focus: outline-none focus:border-[#666] focus:shadow-[0 0 1 #666] mx-2" min="0" max="100" value={age} onChange={handleAgeChange} />
                    <span>{age}</span>
                </div>


                <div className="flex justify-center mt-5 dashboard-users-filter-buttons">
                    {hasFilters && (
                        <Button className="m-2.5 p-2.5 border border-[#ccc] bg-[#333] text-[#d1d1d1] text-[16px] cursor-pointer" onClick={resetFilters}>Restablecer</Button>
                    )}
                    <Button className="m-2.5 p-2.5 border border-[#ccc] bg-[#333] text-[#d1d1d1] text-[16px] cursor-pointer" onClick={handleExportCSV}>Exportar a CSV</Button>
                </div>
            </div>

            {filteredUsers?.length === 0 ? (
                <NullResults text={gender || nationality || age} module={t.moduleName} />
            ) : (
                <div className="grid grid-cols-[1fr] gap-5  min-[480px]:grid-cols-2 md:grid-cols-4">
                    {filteredUsers.slice(start, end).map((user) => (
                        <Card
                            type="normal"
                            dataType="user"
                            key={user.login.uuid}
                            data={user}
                            title={`${user.name.title} ${user.name.first} ${user.name.last}`}
                            onDelete={() => handleDeleteUser(navigate, user.login.uuid)}
                            onView={() => handleViewUser(navigate, user.login.uuid)}
                            onExport={() => handleExportUserCSV(user.login.uuid)}
                            onMessage={true}
                        />
                    ))}
                </div>
            )}

            <Pagination pages={renderPageNumbers(pages, currentPage)} currentPage={currentPage} handlePageChange={handlePageChange} itemsPerPage={itemsPerPage} handleItemsPerPageChange={handleItemsPerPageChange} itemsPerPageOptions={itemsPerPageOptions} t={t} />
            <div className="basis-full order-99 flex justify-center items-center mt-5 box-border max-[980px]:order-99 max-[980px]:basis-full">
                <Button
                    type="button"
                    className="bg-[#3e8e41] py-2.5 px-5 border-none cursor-pointer w-fit!"
                    onClick={() => navigate(-1)}
                >
                    <FaChevronLeft /> Regresar
                </Button>
            </div>
        </div>
    );
};
