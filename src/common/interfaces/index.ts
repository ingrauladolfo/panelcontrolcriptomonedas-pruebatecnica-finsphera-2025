import type { UserLogin, StoreLogin } from "@/common/interfaces/stores/pages/Login";
import type { PathToTitle } from "./routes/PathToTitle";
import type { LanguageContextValue } from "./context/Language";
import type { ButtonProps } from "./components/shared/Button";
import type { DashboardHomeState } from "./pages/Dashboard/Home";
import type { CardProps, } from "./components/Dashboard/Card";
import type { RandomUser, UserState } from './components/Dashboard/Navbar'
import type { UserProfileProps } from "./components/Dashboard/UserProfile";
import type { ModalProps, SendMessageModalProps, Message } from "@/common/interfaces/components/shared/Modal";
import type { CryptoState } from "./stores/pages/Dashboard/CryptoCurrencies";
import type { SearchProps } from "./components/Dashboard/Search";
import type { SearchState, SearchActions } from "./stores/components/Dashboard/Search";
import type { NullResultsFoundProps } from "./components/Dashboard/NullResults";
import type { PaginationProps } from "./components/Dashboard/Pagination";
import type { UsersStore } from '@/common/interfaces/stores/pages/Dashboard/Users'
import type { User } from '@/common/interfaces/stores/pages/Dashboard/Users/User'
import type { MessagesMap, SendMessageState } from "@/common/interfaces/stores/components/Dashboard/Modal";
import type { UserMessage, UserDetailsStore } from "./pages/Dashboard/Users/UserDetails";
export type { UserLogin, StoreLogin, PathToTitle, LanguageContextValue, ButtonProps, DashboardHomeState, CardProps, RandomUser, UserState, UserProfileProps, ModalProps, SendMessageModalProps, Message, CryptoState, SearchProps, SearchState, SearchActions, NullResultsFoundProps, PaginationProps, UsersStore, User, MessagesMap, SendMessageState, UserMessage, UserDetailsStore }