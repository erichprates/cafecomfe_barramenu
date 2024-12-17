import { useState, useEffect } from 'react';

export function DevDateControls() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const testDate = localStorage.getItem('test_date');
    return testDate ? new Date(testDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    // Define meio-dia para evitar problemas com timezone
    newDate.setHours(12, 0, 0, 0);
    const isoDate = newDate.toISOString();
    
    localStorage.setItem('test_date', isoDate);
    setSelectedDate(event.target.value);
    
    // Dispara evento de storage manualmente para notificar mudanças
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'test_date',
      newValue: isoDate,
      oldValue: localStorage.getItem('test_date'),
      storageArea: localStorage
    }));
  };

  const handleReset = () => {
    const oldValue = localStorage.getItem('test_date');
    localStorage.removeItem('test_date');
    setSelectedDate(new Date().toISOString().split('T')[0]);
    
    // Dispara evento de storage manualmente para notificar mudanças
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'test_date',
      newValue: null,
      oldValue,
      storageArea: localStorage
    }));
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-300">
          Data de Teste:
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="ml-2 p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </label>
        <button
          onClick={handleReset}
          className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Resetar Data
        </button>
      </div>
    </div>
  );
}