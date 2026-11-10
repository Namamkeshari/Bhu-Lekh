import React, { useState } from 'react';
import {
  Building2,
  Wallet,
  Cpu,
  Search,
  Layers,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  UserCheck,
  Briefcase,
  Home,
  ShieldAlert,
  User,
  Calculator,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';
import { TestAccount, UserRole } from '../types/blockchain';
import { shortenAddress, formatEth } from '../utils/formatters';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  accounts: TestAccount[];
  currentAccount: TestAccount;
  onSelectAccount: (acc: TestAccount) => void;
  blockNumber: number;
  onResetState: () => void;
  onOpenProfile?: () => void;
  onOpenTaxCalculator?: () => void;
  onOpenDueDiligence?: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  accounts,
  currentAccount,
  onSelectAccount,
  blockNumber,
  onResetState,
  onOpenProfile,
  onOpenTaxCalculator,
  onOpenDueDiligence,
}) => {
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all property registries, transactions, and event logs back to initial seeded state?')) {
      setResetting(true);
      onResetState();
      setTimeout(() => setResetting(false), 500);
    }
  };

  const navItems = [
    { id: 'owner', label: 'My Properties', icon: Home, roleTag: 'Owner' },
    { id: 'buyer', label: 'Buyer & Escrow', icon: Briefcase, roleTag: 'Buyer' },
    { id: 'verify', label: 'Title Verification', icon: Search, highlight: true },
    { id: 'contract', label: 'Smart Contract & Remix', icon: Cpu, badge: 'Solidity' },
    { id: 'explorer', label: 'EVM Explorer', icon: Layers, badge: 'Logs' },
  ];
  const authorityItem = { id: 'authority', label: 'Land Authority', icon: Building2, roleTag: 'Admin' };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-[0_1px_8px_rgba(23,32,29,0.04)]">
      <div className="navbar-container max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar-layout">
          {/* Left section: logo, brand, and authority navigation */}
          <div className="navbar-left">
            <div className="navbar-brand flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('authority')}>
              <div className="h-10 w-10 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20 ring-2 ring-teal-50">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-stone-900 whitespace-nowrap">
                    Bhu-Lekh
                  </span>
                  <span className="navbar-brand-tagline hidden xl:inline text-xs font-bold text-teal-700 tracking-wide uppercase whitespace-nowrap">
                    with Blockchain
                  </span>
                </div>
                <div className="navbar-brand-status hidden sm:flex mt-0.5 text-[11px] text-stone-500 items-center gap-1.5 whitespace-nowrap">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Secure land records</span>
                  <span className="text-stone-300">•</span>
                  <span className="font-mono text-stone-600">Block #{blockNumber}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab(authorityItem.id)}
              className={`navbar-item navbar-authority flex-none items-center gap-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === authorityItem.id
                  ? 'bg-teal-700 text-white shadow-xs shadow-teal-700/25'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-teal-50/70'
              }`}
            >
              <Building2 className={`h-4 w-4 ${activeTab === authorityItem.id ? 'text-white' : 'text-teal-700'}`} />
              <span>{authorityItem.label}</span>
            </button>
          </div>

          {/* Center section: primary workspace navigation */}
          <nav className="desktop-nav navbar-center" aria-label="Primary navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`navbar-item relative flex-none items-center gap-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-xs shadow-teal-700/25'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-teal-50/70'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-teal-700'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`navbar-item-badge hidden xl:inline text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-teal-50 text-teal-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right section: profile, reset, and wallet controls */}
          <div className="navbar-right">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="responsive-menu-toggle h-9 w-9 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 hover:bg-teal-50 hover:text-teal-800 items-center justify-center transition"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            {/* Quick Profile Button */}
            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                title="View Government KYC Credentials, Digital Signature Key & Wallet Balance"
                className="navbar-profile flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 rounded-lg transition border border-stone-200 font-semibold"
              >
                <User className="h-3.5 w-3.5 text-teal-700" />
                <span className="hidden 2xl:inline">Profile & KYC</span>
              </button>
            )}

            {/* Quick Tax Calculator Button */}
            {onOpenTaxCalculator && (
              <button
                onClick={onOpenTaxCalculator}
                title="Automated Stamp Duty & Real Estate Closing Cost Calculator"
                className="hidden"
              >
                <Calculator className="h-3.5 w-3.5 text-teal-700" />
                <span>Stamp Duty Calc</span>
              </button>
            )}

            {/* Quick Due Diligence Button */}
            {onOpenDueDiligence && (
              <button
                onClick={onOpenDueDiligence}
                title="6-Point On-Chain Title Encumbrance & Legal Risk Audit"
                className="hidden"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Due Diligence</span>
              </button>
            )}

              <button
              onClick={handleReset}
              title="Reset blockchain state to initial mock data"
              disabled={resetting}
                className="desktop-reset items-center gap-1 px-2.5 py-1.5 text-xs text-stone-600 bg-stone-50 hover:bg-stone-100 hover:text-stone-900 rounded-lg transition border border-stone-200"
            >
              <RotateCcw className={`h-3.5 w-3.5 text-stone-500 ${resetting ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Reset</span>
            </button>

            {/* Test Wallet Switcher Dropdown */}
            <div className="navbar-wallet relative">
              <button
                onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-teal-50/60 border border-teal-200 rounded-lg hover:border-teal-300 transition text-left"
              >
                <div className={`h-7 w-7 rounded-lg bg-gradient-to-tr ${currentAccount.avatarColor} flex items-center justify-center text-white text-xs font-bold shadow-xs`}>
                  {currentAccount.name.charAt(0)}
                </div>
                <div className="hidden 2xl:block">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-stone-900 leading-tight">
                      {currentAccount.name.split('(')[0]}
                    </span>
                    <span className="text-[10px] font-medium text-orange-700 bg-orange-100 px-1 rounded">
                      {currentAccount.role}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-stone-500 leading-tight">
                    {formatEth(currentAccount.balanceEth)} • {shortenAddress(currentAccount.address)}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-stone-500" />
              </button>

              {walletDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setWalletDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-orange-200/90 p-2 z-30 divide-y divide-stone-100">
                    <div className="p-2.5">
                      <div className="flex items-center justify-between text-xs font-bold text-stone-900 mb-1">
                        <span className="flex items-center gap-1.5">
                          <Wallet className="h-4 w-4 text-orange-600" />
                          Simulate Actor Wallet
                        </span>
                        <span className="text-[10px] text-stone-400 font-normal">Switch with 1-click</span>
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Test authorization rules, modifiers, and reverts by switching active EVM signers.
                      </p>
                    </div>

                    <div className="py-1 space-y-1">
                      {accounts.map((acc) => {
                        const isSelected =
                          acc.address &&
                          currentAccount?.address &&
                          acc.address.toLowerCase() === currentAccount.address.toLowerCase();
                        return (
                          <button
                            key={acc.address}
                            onClick={() => {
                              onSelectAccount(acc);
                              setWalletDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition ${
                              isSelected
                                ? 'bg-orange-100/70 border border-orange-300'
                                : 'hover:bg-stone-50 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`h-8 w-8 rounded-lg bg-gradient-to-tr ${acc.avatarColor} flex items-center justify-center text-white text-xs font-bold shadow-xs`}>
                                {acc.name.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-stone-900">{acc.name}</span>
                                  {acc.role === UserRole.AUTHORITY && (
                                    <span className="text-[9px] bg-orange-600 text-white font-bold px-1 rounded">
                                      ADMIN
                                    </span>
                                  )}
                                  {acc.role === UserRole.UNAUTHORIZED && (
                                    <span className="text-[9px] bg-rose-600 text-white font-bold px-1 rounded">
                                      NO ROLE
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-stone-500 font-mono">
                                  {shortenAddress(acc.address, 5)} • {formatEth(acc.balanceEth)}
                                </div>
                              </div>
                            </div>
                            {isSelected && <CheckCircle2 className="h-4 w-4 text-orange-600" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-2 bg-orange-50/50 rounded-b-xl text-[11px] text-stone-600 flex items-center justify-between">
                      {onOpenProfile ? (
                        <button
                          onClick={() => {
                            setWalletDropdownOpen(false);
                            onOpenProfile();
                          }}
                          className="w-full text-center py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                        >
                          <User className="h-3.5 w-3.5" />
                          <span>View Full Profile & KYC Credentials</span>
                        </button>
                      ) : (
                        <>
                          <span>MetaMask Web3 Provider:</span>
                          <span className="text-orange-700 font-semibold flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            Virtual RPC Ready
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="responsive-menu-panel border-t border-stone-100 py-2" aria-label="Responsive navigation menu">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex min-w-0 items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-left transition ${
                      isActive ? 'bg-teal-700 text-white' : 'text-stone-700 hover:bg-teal-50 hover:text-teal-900'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-teal-700'}`} />
                    <span className="min-w-0 truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-md font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-teal-50 text-teal-800'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mobile-menu-actions">
              {onOpenProfile && (
                <button type="button" onClick={onOpenProfile} className="mobile-menu-action">
                  <User className="h-4 w-4 text-teal-700" />
                  <span>Profile &amp; KYC</span>
                </button>
              )}
              <button type="button" onClick={handleReset} className="mobile-menu-action">
                <RotateCcw className={`h-4 w-4 text-stone-500 ${resetting ? 'animate-spin' : ''}`} />
                <span>Reset blockchain state</span>
              </button>
              <button
                type="button"
                onClick={() => setWalletDropdownOpen((open) => !open)}
                className="mobile-menu-action"
                aria-expanded={walletDropdownOpen}
              >
                <Wallet className="h-4 w-4 text-orange-600" />
                <span>Switch wallet: {currentAccount.name.split('(')[0].trim()}</span>
                <ChevronDown className="ml-auto h-4 w-4 text-stone-400" />
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
