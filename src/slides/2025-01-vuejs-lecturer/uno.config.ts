import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    // ベースとなるボタンスタイル
    'btn': 'rounded-lg border border-transparent transition-colors duration-200 hover:bg-gray-100',
    // プライマリーボタン
    'btn-primary': ' bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 active:opacity-90 active:from-blue-500 active:to-blue-700 focus:ring-blue-500',
    // セカンダリーボタン
    'btn-secondary': ' bg-gradient-to-r from-gray-100 to-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-400 active:opacity-90 active:from-gray-200 active:to-gray-400 focus:ring-gray-500',
    // アクセントボタン
    'btn-accent': ' bg-gradient-to-br from-purple-400 to-pink-600 text-white hover:from-purple-500 hover:to-pink-700 active:opacity-90 active:from-purple-500 active:to-pink-700 focus:ring-purple-500',
    // 警告ボタン
    'btn-warning': ' bg-gradient-to-r from-yellow-400 to-orange-600 text-white hover:from-yellow-500 hover:to-orange-700 active:opacity-90 active:from-yellow-500 active:to-orange-700 focus:ring-orange-500',
    // 危険ボタン
    'btn-danger': ' bg-gradient-to-r from-red-400 to-rose-700 text-white hover:from-red-500 hover:to-rose-800 active:opacity-90 active:from-red-500 active:to-rose-800 focus:ring-red-500',
    // サクセスボタン
    'btn-success': ' bg-gradient-to-r from-emerald-400 to-green-600 text-white hover:from-emerald-500 hover:to-green-700 active:opacity-90 active:from-emerald-500 active:to-green-700 focus:ring-emerald-500',
    // アウトラインボタン
    'btn-outline': ' border-2 border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-200 active:from-gray-100 active:to-gray-200 focus:ring-gray-500',
    // ソフトボタン
    'btn-soft': ' bg-gradient-to-r from-blue-50 to-blue-200 text-blue-700 hover:from-blue-100 hover:to-blue-300 active:opacity-90 active:from-blue-100 active:to-blue-300 focus:ring-blue-400',
    // サイズバリエーション
    'btn-xs': 'px-2 py-1 text-xs',
    'btn-sm': 'px-3 py-1.5 text-sm',
    'btn-lg': 'px-6 py-3 text-lg',
    'btn-xl': 'px-8 py-4 text-xl',
    
    // インプットフィールドのベーススタイル
    'input': 'rounded-lg border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-400',
    // エラー状態
    'input-error': 'border-red-300 focus:ring-red-500',
    // 無効状態
    'input-disabled': 'bg-gray-50 text-gray-500 cursor-not-allowed',
    // サイズバリエーション
    'input-xs': 'px-2 py-1 text-sm',
    'input-sm': 'px-3 py-1.5 text-sm',
    'input-md': 'px-4 py-2 text-base',
    'input-lg': 'px-6 py-3 text-lg',

    'card-example': 'border border-gray-300 bg-gray-300/10 rounded-md',
  },
})
