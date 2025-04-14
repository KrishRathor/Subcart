import { useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';

type ButtonSize = 'small' | 'medium' | 'large';
type ContainerWidth = 'full' | 'contained';
type LogoType = 'image' | 'text';
type LinkFontWeight = '300' | '400' | '500' | '600' | '700';
type MenuAlignment = 'left' | 'center' | 'right'; // Alignment for the menu links block

interface MenuItem {
  id: string;
  text: string;
  href: string;
}

interface UserNavbarProps {
  background?: string;
  paddingX?: number; // rem
  paddingY?: number; // rem
  sticky?: boolean;
  containerWidth?: ContainerWidth;
  maxWidth?: number; // px
  borderBottomColor?: string;
  borderBottomWidth?: number; // px
  height?: number | string; // px or 'auto' etc.

  logoType?: LogoType;
  logoImageUrl?: string;
  logoText?: string;
  logoLink?: string;
  logoWidth?: number; // px
  logoTextSize?: number; // rem
  logoTextColor?: string;

  menuItems?: MenuItem[];
  menuAlignment?: MenuAlignment; // Controls alignment of the menu block
  linkColor?: string;
  linkHoverColor?: string; // Note: Hover requires CSS class or state
  linkFontSize?: number; // rem
  linkFontWeight?: LinkFontWeight;

  actionButtonText?: string;
  actionButtonLink?: string;
  actionButtonBackground?: string;
  actionButtonColor?: string;
  actionButtonSize?: ButtonSize;
  // children prop is removed as this component is not a generic container
}

export const UserNavbar = ({
  background = "var(--navbar-bg, #1F2937)",
  paddingX = 4,
  paddingY = 1,
  sticky = false,
  containerWidth = 'contained',
  maxWidth = 1280,
  borderBottomColor = "var(--navbar-border-color, #374151)",
  borderBottomWidth = 1,
  height = 'auto',
  logoType = 'text',
  logoImageUrl = 'https://via.placeholder.com/120x40/ffffff/9ca3af?text=Logo',
  logoText = 'SiteLogo',
  logoLink = '/',
  logoWidth = 120,
  logoTextSize = 1.25,
  logoTextColor = "var(--navbar-logo-color, #E5E7EB)",
  menuItems = [{ id: '1', text: 'Home', href: '/' }, { id: '2', text: 'Features', href: '/#features' }, { id: '3', text: 'Pricing', href: '/pricing' }],
  menuAlignment = 'left',
  linkColor = "var(--navbar-link-color, #D1D5DB)",
  linkHoverColor = "var(--navbar-link-hover-color, #FFFFFF)",
  linkFontSize = 0.875,
  linkFontWeight = '500',
  actionButtonText = 'Get Started',
  actionButtonLink = '#',
  actionButtonBackground = "var(--button-primary-bg, #6D28D9)",
  actionButtonColor = "var(--button-primary-color, #FFFFFF)",
  actionButtonSize = 'medium',
}: UserNavbarProps) => {

  const { connectors: { connect, drag }, isSelected } = useNode(state => ({
    isSelected: state.events.selected,
  }));

  const parseDimension = (value: string | number | undefined, defaultUnit: string = 'px'): string => { if (value === undefined || value === null) return ''; if (typeof value === 'number') return `${value}${defaultUnit}`; return String(value); };

  const navStyle: CSSProperties = { paddingTop: `${paddingY}rem`, paddingBottom: `${paddingY}rem`, backgroundColor: background, width: '100%', position: sticky ? 'sticky' : 'relative', top: sticky ? 0 : undefined, zIndex: sticky ? 50 : undefined, borderBottom: `${borderBottomWidth}px solid ${borderBottomColor}`, boxSizing: 'border-box', };
  if (isSelected) { navStyle.outline = '2px dashed var(--editor-highlight-color, #6D28D9)'; navStyle.outlineOffset = '-2px'; }

  const containerStyle: CSSProperties = { width: '100%', height: parseDimension(height, 'px'), minHeight: typeof height === 'number' ? `${height}px` : '40px', paddingLeft: `${paddingX}rem`, paddingRight: `${paddingX}rem`, display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'space-between', }; // Always space-between for outer structure
  if (containerWidth === 'contained') { containerStyle.maxWidth = `${maxWidth}px`; containerStyle.marginLeft = 'auto'; containerStyle.marginRight = 'auto'; }

  const logoStyle: CSSProperties = { flexShrink: 0 };
  const logoImgStyle: CSSProperties = { display: 'block', height: 'auto', width: `${logoWidth}px` };
  const logoTextStyle: CSSProperties = { fontSize: `${logoTextSize}rem`, fontWeight: '600', color: logoTextColor, textDecoration: 'none', whiteSpace: 'nowrap' };

  // Apply auto margins based on menuAlignment prop for flex layout
  const menuStyle: CSSProperties = { display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center', marginLeft: menuAlignment === 'center' || menuAlignment === 'right' ? 'auto' : '1.5rem', marginRight: menuAlignment === 'center' ? 'auto' : '1.5rem', };
  const linkStyle: CSSProperties = { fontSize: `${linkFontSize}rem`, color: linkColor, textDecoration: 'none', transition: 'color 0.15s ease-in-out', fontWeight: linkFontWeight };

  const actionButtonPaddingVarX = `var(--button-padding-x-${actionButtonSize}, ${actionButtonSize === 'small' ? '0.75rem' : actionButtonSize === 'large' ? '1.25rem' : '1rem'})`;
  const actionButtonPaddingVarY = `var(--button-padding-y-${actionButtonSize}, ${actionButtonSize === 'small' ? '0.375rem' : actionButtonSize === 'large' ? '0.625rem' : '0.5rem'})`;
  const actionButtonFontSizeVar = `var(--button-font-size-${actionButtonSize}, ${actionButtonSize === 'small' ? '0.875rem' : actionButtonSize === 'large' ? '1.125rem' : '1rem'})`;
  const actionButtonStyle: CSSProperties = { display: 'inline-block', paddingTop: actionButtonPaddingVarY, paddingBottom: actionButtonPaddingVarY, paddingLeft: actionButtonPaddingVarX, paddingRight: actionButtonPaddingVarX, backgroundColor: actionButtonBackground, color: actionButtonColor, borderRadius: 'var(--button-border-radius, 6px)', fontSize: actionButtonFontSizeVar, fontWeight: '500', textDecoration: 'none', textAlign: 'center', transition: 'background-color 0.15s ease-in-out', flexShrink: 0, whiteSpace: 'nowrap', cursor: 'pointer', };


  return (
    <nav ref={(ref: HTMLElement | null) => { ref && connect(drag(ref)) }} style={navStyle}>
      <div style={containerStyle}>
        <div style={logoStyle}>
          <a href={logoLink || '#'} onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none' }}>
            {logoType === 'image' ? (<img src={logoImageUrl} alt={logoText || 'Logo'} style={logoImgStyle} />) : (<span style={logoTextStyle}>{logoText}</span>)}
          </a>
        </div>
        <div style={menuStyle}>
          {(menuItems || []).map((item, index) => (
            <a key={item.id || index} href={item.href || '#'} onClick={(e) => e.preventDefault()} style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)} onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}>
              {item.text}
            </a>
          ))}
        </div>
        {actionButtonText && (
          <div style={{ marginLeft: menuAlignment === 'center' ? 'auto' : undefined }}>
            <a href={actionButtonLink || '#'} onClick={(e) => e.preventDefault()} style={actionButtonStyle}>
              {actionButtonText}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
const UserNavbarSettings = () => {
  const { actions: { setProp }, props } = useNode(node => ({ props: node.data.props as UserNavbarProps }));
  const debounceTime = 300;

  return (
    <div className="space-y-4 p-4">
      <details className="space-y-3 border-b border-gray-700 pb-3" open>
        <summary className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-200">Layout & Style</summary>
        <SettingsInput
          label="Background" type="text" value={props.background || ''}
          onChange={value => setProp((props: UserNavbarProps) => props.background = value, debounceTime)}
        />
        <div className="grid grid-cols-2 gap-2">
          <SettingsInput
            label="Padding X (rem)" type="number" step={0.1} min={0} value={props.paddingX ?? 4}
            onChange={value => { const num = parseFloat(String(value) || '0'); setProp((props: UserNavbarProps) => props.paddingX = isNaN(num) ? 4 : num, debounceTime); }}
          />
          <SettingsInput
            label="Padding Y (rem)" type="number" step={0.1} min={0} value={props.paddingY ?? 1}
            onChange={value => { const num = parseFloat(String(value) || '0'); setProp((props: UserNavbarProps) => props.paddingY = isNaN(num) ? 1 : num, debounceTime); }}
          />
        </div>
        <SettingsInput
          label="Height (px, auto)" type="text" value={props.height ?? 'auto'}
          onChange={value => { const finalValue = value === '' ? 'auto' : value; setProp((props: UserNavbarProps) => props.height = finalValue, debounceTime); }}
        />
        <SettingsSelect
          label="Content Width" value={props.containerWidth || 'contained'}
          options={[{ value: 'contained', label: 'Contained' }, { value: 'full', label: 'Full Width' }]}
          onChange={value => setProp((props: UserNavbarProps) => props.containerWidth = value as ContainerWidth, debounceTime)}
        />
        {props.containerWidth === 'contained' && (
          <SettingsInput
            label="Max Width (px)" type="number" min={300} value={props.maxWidth ?? 1280}
            onChange={value => { const num = parseInt(String(value) || '0', 10); setProp((props: UserNavbarProps) => props.maxWidth = isNaN(num) ? 1280 : num, debounceTime); }}
          />
        )}
        {/* Removed Old Layout Select - Use Menu Alignment Now */}
        <div className="grid grid-cols-2 gap-2">
          <SettingsInput
            label="Border Bottom Width (px)" type="number" min={0} value={props.borderBottomWidth ?? 1}
            onChange={value => { const num = parseInt(String(value) || '0', 10); setProp((props: UserNavbarProps) => props.borderBottomWidth = isNaN(num) ? 0 : num, debounceTime); }}
          />
          <SettingsInput
            label="Border Bottom Color" type="text" value={props.borderBottomColor || ''}
            onChange={value => setProp((props: UserNavbarProps) => props.borderBottomColor = value, debounceTime)}
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-400 mt-2">
            <input type="checkbox" checked={props.sticky ?? false} onChange={e => setProp((props: UserNavbarProps) => props.sticky = e.target.checked, debounceTime)} className="mr-2 h-4 w-4 rounded text-purple-600 focus:ring-purple-500 bg-gray-800 border-gray-700" /> Sticky Navbar
          </label>
        </div>
      </details>

      <details className="space-y-3 border-b border-gray-700 pb-3" open>
        <summary className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-200">Logo</summary>
        <SettingsSelect label="Logo Type" value={props.logoType || 'text'} options={[{ value: 'text', label: 'Text' }, { value: 'image', label: 'Image' }]} onChange={value => setProp((props: UserNavbarProps) => props.logoType = value as LogoType)} />
        {props.logoType === 'image' ? (
          <>
            <SettingsInput label="Logo Image URL" value={props.logoImageUrl || ''} onChange={value => setProp((props: UserNavbarProps) => props.logoImageUrl = value)} />
            <SettingsInput label="Logo Width (px)" type="number" min={10} value={props.logoWidth ?? 100} onChange={value => { const num = parseInt(String(value) || '0', 10); setProp((props: UserNavbarProps) => props.logoWidth = isNaN(num) ? 10 : num, debounceTime); }} />
          </>
        ) : (
          <SettingsInput label="Logo Text" value={props.logoText || ''} onChange={value => setProp((props: UserNavbarProps) => props.logoText = value)} />
        )}
        <SettingsInput label="Logo Text Color" type="text" value={props.logoTextColor || ''} onChange={value => setProp((props: UserNavbarProps) => props.logoTextColor = value)} />
        <SettingsInput label="Logo Text Size (rem)" type="number" step={0.1} min={0.5} value={props.logoTextSize ?? 1.25} onChange={value => { const num = parseFloat(String(value) || '0'); setProp((props: UserNavbarProps) => props.logoTextSize = isNaN(num) ? 1 : num, debounceTime); }} />
        <SettingsInput label="Logo Link URL" value={props.logoLink || ''} onChange={value => setProp((props: UserNavbarProps) => props.logoLink = value)} />
      </details>

      <details className="space-y-3 border-b border-gray-700 pb-3" open>
        <summary className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-200">Menu Items</summary>
        <SettingsSelect
          label="Menu Alignment" value={props.menuAlignment || 'left'}
          options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }]}
          onChange={value => setProp((props: UserNavbarProps) => props.menuAlignment = value as MenuAlignment, debounceTime)}
        />
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {(props.menuItems || []).map((item, index) => (
            <div key={item.id || index} className="p-2 border border-gray-700 rounded space-y-2 relative bg-gray-800/30">
              <SettingsInput
                label={`Item ${index + 1} Text`} value={item.text}
                onChange={value => { setProp((currentProps: UserNavbarProps) => { const newItems = [...(currentProps.menuItems || [])]; if (newItems[index]) { newItems[index] = { ...newItems[index], text: value }; } currentProps.menuItems = newItems; }, debounceTime); }}
              />
              <SettingsInput
                label={`Item ${index + 1} URL`} value={item.href}
                onChange={value => { setProp((currentProps: UserNavbarProps) => { const newItems = [...(currentProps.menuItems || [])]; if (newItems[index]) { newItems[index] = { ...newItems[index], href: value }; } currentProps.menuItems = newItems; }, debounceTime); }}
              />
              <button
                onClick={() => { setProp((currentProps: UserNavbarProps) => { const newItems = [...(currentProps.menuItems || [])]; newItems.splice(index, 1); currentProps.menuItems = newItems; }); }}
                className="absolute top-1 right-1 text-red-500 hover:text-red-400 p-0.5" title="Remove Item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => { setProp((currentProps: UserNavbarProps) => { const currentItems = currentProps.menuItems || []; currentProps.menuItems = [...currentItems, { id: `temp-${Date.now()}`, text: 'New Link', href: '#' }]; }); }}
          className="text-purple-400 hover:text-purple-300 text-sm font-medium mt-2"
        >
          + Add Menu Item
        </button>
        <SettingsInput label="Link Color" type="text" value={props.linkColor || ''} onChange={value => setProp((props: UserNavbarProps) => props.linkColor = value)} />
        <SettingsInput label="Link Hover Color" type="text" value={props.linkHoverColor || ''} onChange={value => setProp((props: UserNavbarProps) => props.linkHoverColor = value)} />
        <SettingsInput label="Link Font Size (rem)" type="number" step={0.05} min={0.5} value={props.linkFontSize ?? 0.875} onChange={value => { const num = parseFloat(String(value) || '0'); setProp((props: UserNavbarProps) => props.linkFontSize = isNaN(num) ? 0.75 : num, debounceTime); }} />
        <SettingsSelect label="Link Font Weight" value={props.linkFontWeight || '500'} options={[{ value: '300', label: 'Light (300)' }, { value: '400', label: 'Normal (400)' }, { value: '500', label: 'Medium (500)' }, { value: '600', label: 'Semi-Bold (600)' }, { value: '700', label: 'Bold (700)' }]} onChange={value => setProp((props: UserNavbarProps) => props.linkFontWeight = value as LinkFontWeight, debounceTime)} />
      </details>

      <details className="space-y-3 pb-3" open>
        <summary className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-200">Action Button</summary>
        <SettingsInput label="Button Text (Optional)" value={props.actionButtonText || ''} onChange={value => setProp((props: UserNavbarProps) => props.actionButtonText = value)} />
        {props.actionButtonText && (<>
          <SettingsInput label="Button Link URL" value={props.actionButtonLink || '#'} onChange={value => setProp((props: UserNavbarProps) => props.actionButtonLink = value)} />
          <SettingsSelect label="Button Size" value={props.actionButtonSize || 'medium'} options={[{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }]} onChange={value => setProp((props: UserNavbarProps) => props.actionButtonSize = value as ButtonSize)} />
          <SettingsInput label="Button Background" type="text" value={props.actionButtonBackground || ''} onChange={value => setProp((props: UserNavbarProps) => props.actionButtonBackground = value)} />
          <SettingsInput label="Button Text Color" type="text" value={props.actionButtonColor || ''} onChange={value => setProp((props: UserNavbarProps) => props.actionButtonColor = value)} />
        </>)}
      </details>
    </div>
  );
};

UserNavbar.craft = {
  props: { background: "var(--navbar-bg, #1F2937)", paddingX: 4, paddingY: 1, sticky: false, menuAlignment: 'left', /* Default menu alignment */ containerWidth: 'contained', maxWidth: 1280, borderBottomColor: "var(--navbar-border-color, #374151)", borderBottomWidth: 1, height: 'auto', logoType: 'text', logoText: 'SiteLogo', logoLink: '/', logoWidth: 120, logoTextSize: 1.25, logoTextColor: "var(--navbar-logo-color, #E5E7EB)", menuItems: [{ id: '1', text: 'Home', href: '/' }, { id: '2', text: 'About', href: '/about' }], linkColor: "var(--navbar-link-color, #D1D5DB)", linkHoverColor: "var(--navbar-link-hover-color, #FFFFFF)", linkFontSize: 0.875, linkFontWeight: '500', actionButtonText: 'Get Started', actionButtonLink: '#', actionButtonBackground: "var(--button-primary-bg, #6D28D9)", actionButtonColor: "var(--button-primary-color, #FFFFFF)", actionButtonSize: 'medium', } as UserNavbarProps,
  related: { settings: UserNavbarSettings },
};
