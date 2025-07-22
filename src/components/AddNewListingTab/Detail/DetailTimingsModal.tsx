import React, { useState } from 'react';

interface DetailTimingsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  timeSlots: Record<string, { start: string; end: string }>;
  setTimeSlots: React.Dispatch<React.SetStateAction<Record<string, { start: string; end: string }>>>;
}

const DetailTimingsModal: React.FC<DetailTimingsModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  timeSlots,
  setTimeSlots,
}) => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
      const hour = h < 10 ? `0${h}` : h.toString();
      times.push(`${hour}:00`, `${hour}:30`);
    }
    return times.map((t) => {
      const [h, m] = t.split(':');
      const hour = parseInt(h, 10);
      const suffix = hour >= 12 ?'PM':'AM';
      const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${adjustedHour}:${m} ${suffix}`;
    });
  };
  const timeOptions = generateTimeOptions();

  const handleDayCheck = (day: string) => {
    setTimeSlots((prev) => {
      if (prev[day]) {
        const updated = { ...prev };
        delete updated[day];
        return updated;
      } else {
        return {
          ...prev,
          [day]: { start: '09:00 AM', end: '05:00 PM' },
        };
      }
    });
  };

  const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
    setTimeSlots((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };

const handleAdd = () => {
  let opening_hrs: { days: string; time: string }[] = [];

  const entries = Object.entries(timeSlots);
  entries.forEach(([day, time]) => {
    opening_hrs.push({
      days: day,
      time: `${time.start} - ${time.end}`,
    });
  });

  setIsModalOpen(false);
};


  if (!isModalOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={() => setIsModalOpen(false)}
    >
      <div
        style={{
          width: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#531e8e',
          borderRadius: '10px',
          padding: '25px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'transparent',
            border: 'none',
            fontSize: '22px',
            color: 'black',
            cursor: 'pointer',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </button>

        <h3 style={{ marginBottom: '20px' }}>Select Time & Week</h3>

        {weekdays.map((day) => (
          <div key={day} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ width: '40%'}}>
            <label style={{color: '#fff', cursor:'pointer'}}>
            <input
              type="checkbox"
              checked={!!timeSlots[day]}
              onChange={() => handleDayCheck(day)}
              style={{ marginRight: '10px' }}
            />{day}</label>
            </div>
            <select
              disabled={!timeSlots[day]}
              value={timeSlots[day]?.start || ''}
              onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
              style={{ marginRight: '28px', color: '#fff', padding: '2px 5px', borderRadius: '5px' }}
            >
              <option value="">Start Time</option>
              {timeOptions.map((time) => (
                <option key={`start-${day}-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <span>to</span>

            <select
              disabled={!timeSlots[day]}
              value={timeSlots[day]?.end || ''}
              onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
              style={{ marginLeft: '28px', color: '#fff', padding: '2px 5px', borderRadius: '5px' }}
            >
              <option value="">End Time</option>
              {timeOptions.map((time) => (
                <option key={`end-${day}-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          onClick={handleAdd}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default DetailTimingsModal;
