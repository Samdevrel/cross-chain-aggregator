'use client';

import { useState } from 'react';

interface SwapRoute {
  from: string;
  to: string;
  amount: number;
  expectedOutput: number;
  gasEstimate: string;
  route: 
      <header className="border-b-4 border-purple-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black">App</h1>
              <p className="text-gray-400 mt-2">Interactive demo</p>
            </div>
            <nav className="flex gap-2">
              <a href="/" className="px-4 py-2 bg-gray-800 border-2 border-gray-600 hover:border-purple-400 rounded font-bold transition-all">
                Home
              </a>
              <a href="/docs" className="px-4 py-2 bg-purple-500 border-2 border-purple-400 rounded font-bold transition-all">
                Documentation
              </a>
            </nav>
          </div>
        </div>
      </header>

string[];
  confirmations: number;
}

interface BridgeRoute {
  from: string;
  to: string;
  amount: number;
  minOutput: number;
  bridgeName: string;
  chains: string[];
  fees: string;
}

const chains = ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base', 'BSC', 'Solana', 'Avalanche', 'Cosmos', 'Fantom'];

const swapRoutes: SwapRoute[] = [
  {
    from: 'ETH',
    to: 'MATIC',
    amount: 1,
    expectedOutput: 1250,
    gasEstimate: '$2.50',
    route: ['Ethereum → Polygon Bridge'],
    confirmations: 3,
  },
  {
    from: 'ETH',
    to: 'ARB',
    amount: 5,
    expectedOutput: 850,
    gasEstimate: '$4.25',
    route: ['Ethereum → Arbitrum Bridge'],
    confirmations: 5,
  },
  {
    from: 'SOL',
    to: 'ETH',
    amount: 10,
    expectedOutput: 6,
    gasEstimate: '$8.00',
    route: ['Solana → Ethereum Bridge (Jupiter)'],
    confirmations: 12,
  },
  {
    from: 'MATIC',
    to: 'ARB',
    amount: 100,
    expectedOutput: 75,
    gasEstimate: '$5.00',
    route: ['Polygon → Arbitrum Bridge'],
    confirmations: 2,
  },
];

const bridgeRoutes: BridgeRoute[] = [
  {
    from: 'ETH',
    to: 'SOL',
    amount: 0.5,
    minOutput: 3.8,
    bridgeName: 'Wormhole',
    chains: ['Ethereum → Solana'],
    fees: '1.5%',
  },
  {
    from: 'ETH',
    to: 'MATIC',
    amount: 2,
    minOutput: 2400,
    bridgeName: 'AnySwap',
    chains: ['Ethereum → Polygon'],
    fees: '1.2%',
  },
  {
    from: 'SOL',
    to: 'ETH',
    amount: 5,
    minOutput: 28,
    bridgeName: 'Hyperlane',
    chains: ['Solana → Ethereum'],
    fees: '2.0%',
  },
  {
    from: 'ARB',
    to: 'SOL',
    amount: 10,
    minOutput: 18,
    bridgeName: 'LayerZero',
    chains: ['Arbitrum → Solana'],
    fees: '1.8%',
  },
];

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<'swap' | 'bridge'>('swap');
  const [amount, setAmount] = useState('');
  const [fromChain, setFromChain] = useState('ETH');
  const [toChain, setToChain] = useState('MATIC');
  const [isSearching, setIsSearching] = useState(false);

  const findRoute = async () => {
    if (!amount || fromChain === toChain) return;
    setIsSearching(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSearching(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-yellow-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">Cross-Chain Aggregator</h1>
          <p className="text-gray-400 mt-2">Swap and bridge across 10+ chains with best rates</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-yellow-400 p-4 text-center">
            <div className="text-3xl font-black text-yellow-400">10+</div>
            <div className="text-sm text-gray-400">Chains</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">4</div>
            <div className="text-sm text-gray-400">Swap Routes</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">3.8%</div>
            <div className="text-sm text-gray-400">Avg Fees</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">2.5</div>
            <div className="text-sm text-gray-400">Avg Confirm</div>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-2 bg-gray-900 p-2 border-2 border-gray-700">
          <button
            onClick={() => setSelectedTab('swap')}
            className={`flex-1 py-3 font-bold border-2 transition-all ${
              selectedTab === 'swap'
                ? 'bg-yellow-500 border-yellow-400'
                : 'bg-gray-800 border-gray-600 hover:border-gray-500'
            }`}
          >
            Swap
          </button>
          <button
            onClick={() => setSelectedTab('bridge')}
            className={`flex-1 py-3 font-bold border-2 transition-all ${
              selectedTab === 'bridge'
                ? 'bg-yellow-500 border-yellow-400'
                : 'bg-gray-800 border-gray-600 hover:border-gray-500'
            }`}
          >
            Bridge
          </button>
        </div>

        {/* Swap Panel */}
        {selectedTab === 'swap' && (
          <section className="bg-gray-900 border-4 border-yellow-400 p-6">
            <h2 className="text-xl font-black text-yellow-400 mb-4">Cross-Chain Swap</h2>

            <div className="mb-4 p-4 bg-gray-800 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">From</label>
                  <select
                    value={fromChain}
                    onChange={(e) => setFromChain(e.target.value)}
                    className="w-full p-3 bg-gray-900 border-2 border-yellow-400 text-white font-bold text-lg"
                  >
                    {chains.map((chain) => (
                      <option key={chain} value={chain}>{chain}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">To</label>
                  <select
                    value={toChain}
                    onChange={(e) => setToChain(e.target.value)}
                    className="w-full p-3 bg-gray-900 border-2 border-yellow-400 text-white font-bold text-lg"
                  >
                    {chains.map((chain) => (
                      <option key={chain} value={chain}>{chain}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full p-3 bg-gray-900 border-2 border-yellow-400 text-white font-bold text-xl"
              />
            </div>

            <button
              onClick={findRoute}
              disabled={!amount || isSearching || fromChain === toChain}
              className="w-full py-4 bg-yellow-500 text-black font-bold border-4 border-yellow-400 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
            >
              {isSearching ? 'Finding Best Routes...' : 'Find Best Swap Route'}
            </button>

            {swapRoutes.map((route) => (
              <div
                key={`${route.from}-${route.to}-${route.amount}`}
                className="mt-4 p-4 bg-gray-800 border border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-yellow-400">{route.from} → {route.to}</span>
                    <span className="px-2 py-1 text-xs font-bold bg-green-900 text-green-400">
                      {route.route.length} hop route
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${route.expectedOutput.toLocaleString()}</div>
                    <div className="text-xs text-green-400">Expected</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-400">
                  <div>
                    <span className="text-gray-500">Gas:</span> {route.gasEstimate}
                  </div>
                  <div>
                    <span className="text-gray-500">Hops:</span> {route.route.length}
                  </div>
                  <div>
                    <span className="text-gray-500">Confirm:</span> {route.confirmations}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Route: {route.route.join(' → ')}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Bridge Panel */}
        {selectedTab === 'bridge' && (
          <section className="bg-gray-900 border-4 border-yellow-400 p-6">
            <h2 className="text-xl font-black text-yellow-400 mb-4">Multi-Chain Bridge</h2>

            <div className="mb-4 p-4 bg-gray-800 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">From Chain</label>
                  <select className="w-full p-3 bg-gray-900 border-2 border-yellow-400 text-white font-bold text-lg">
                    {chains.map((chain) => (
                      <option key={chain} value={chain}>{chain}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">To Chain</label>
                  <select className="w-full p-3 bg-gray-900 border-2 border-yellow-400 text-white font-bold text-lg">
                    {chains.map((chain) => (
                      <option key={chain} value={chain}>{chain}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Amount</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full p-3 bg-gray-900 border-2 border-yellow-400 text-white font-bold text-xl"
              />
            </div>

            <button className="w-full py-4 bg-yellow-500 text-black font-bold border-4 border-yellow-400 hover:bg-yellow-400 text-xl">
              Find Best Bridge
            </button>

            {bridgeRoutes.map((route) => (
              <div
                key={`${route.from}-${route.to}`}
                className="mt-4 p-4 bg-gray-800 border border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-bold text-yellow-400 text-lg">{route.bridgeName}</span>
                    <span className="ml-3 text-sm text-gray-400">{route.chains.join(' → ')}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">${route.minOutput}</div>
                    <div className="text-xs">Min Output</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-400">
                  <div>
                    <span className="text-gray-500">Fees:</span> {route.fees}
                  </div>
                  <div>
                    <span className="text-gray-500">Transfer:</span> Instant
                  </div>
                  <div>
                    <span className="text-gray-500">Confirm:</span> 1-12
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Supported Chains */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Supported Chains</h2>
          <div className="flex flex-wrap gap-3">
            {chains.map((chain) => (
              <span key={chain} className="px-4 py-2 bg-gray-800 border border-gray-600 text-sm font-bold">
                {chain}
              </span>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How Cross-Chain Aggregator Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Select Chain</h3>
              <p className="text-xs text-gray-400">Choose source and destination</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Route Analysis</h3>
              <p className="text-xs text-gray-400">Compare multiple bridges & routes</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Best Rate</h3>
              <p className="text-xs text-gray-400">Find optimal swap/bridge</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Auto-Bridge</h3>
              <p className="text-xs text-gray-400">Execute through optimized route</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-yellow-400 hover:underline">@samdevrel</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
