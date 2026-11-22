import { useId, useRef, useState } from 'react';

function checkName(value) {
  const name = value.trim();
  if (name === '') return '';
  if (name.length < 2) return '이름은 두 글자 이상 적어 주세요.';
  if (/[0-9]/.test(name)) return '숫자는 빼 주세요.';
  return '';
}

// LAB 3 (Slide 15): Input Focus with useRef
export default function Lab3InputFocus() {
  const inputRef = useRef(null);
  const nameId = useId();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const focusInput = () => {
    inputRef.current.focus();
  };

  const clearInput = () => {
    setName('');
    setError('');
    inputRef.current.focus();
  };

  const onChange = (event) => {
    const value = event.target.value;
    setName(value);
    setError(checkName(value));
  };

  const valid = name.trim() !== '' && error === '';

  return (
    <div>
      <p className="hint">Focus는 입력창으로 커서를 옮기고, Clear는 내용을 지운 뒤 다시 포커스합니다.</p>
      <label htmlFor={nameId} className="hint">이름</label>
      <input id={nameId} className="field" placeholder="이름을 입력하세요"
        ref={inputRef} value={name} onChange={onChange} />
      {error ? <p className="field-error">{error}</p> : null}
      {valid ? <p className="field-ok">사용할 수 있는 이름입니다.</p> : null}
      <div className="controls">
        <button onClick={focusInput}>Focus</button>
        <button className="secondary" onClick={clearInput}>Clear</button>
      </div>
    </div>
  );
}
