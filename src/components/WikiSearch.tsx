import React, { useState, FC, ChangeEvent, MouseEvent, FormEvent } from 'react';
import { WikiSearchResult } from '../types';

interface WikiSearchProps {
  wikiSearchQuery: string;
  setWikiSearchQuery: (query: string) => void;
  wikiSearchResults: WikiSearchResult[];
  isWikiLoading: boolean;
  selectedHero: WikiSearchResult | null;
  setSelectedHero: (hero: WikiSearchResult | null) => void;
  isMobile: boolean;
  onFetchWiki?: (searchType: string) => void | Promise<void>;
}

type SearchType = 'hero' | 'champion' | 'agent';

const WikiSearch: FC<WikiSearchProps> = ({
  wikiSearchQuery,
  setWikiSearchQuery,
  wikiSearchResults,
  isWikiLoading,
  selectedHero,
  setSelectedHero,
  isMobile,
  onFetchWiki
}) => {
  const [wikiSearchType, setWikiSearchType] = useState<SearchType>('hero');

  const handleWikiSearch = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (wikiSearchQuery.trim()) {
      onFetchWiki?.(wikiSearchType);
    }
  };

  const handleSearchTypeClick = (type: SearchType): void => {
    setWikiSearchType(type);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWikiSearchQuery(e.target.value);
  };

  const handleResultClick = (result: WikiSearchResult): void => {
    setSelectedHero(result);
  };

  const handleButtonMouseEnter = (e: MouseEvent<HTMLButtonElement>): void => {
    if (!isMobile) {
      e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)';
    }
  };

  const handleButtonMouseLeave = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)';
  };

  const handleResultCardMouseEnter = (e: MouseEvent<HTMLDivElement>): void => {
    if (!isMobile) {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)';
      e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.3)';
    }
  };

  const handleResultCardMouseLeave = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)';
    e.currentTarget.style.boxShadow = 'none';
  };

  const handleViewDetailsClick = (e: MouseEvent<HTMLButtonElement>, result: WikiSearchResult): void => {
    e.stopPropagation();
    setSelectedHero(result);
  };

  const handleViewDetailsMouseEnter = (e: MouseEvent<HTMLButtonElement>): void => {
    if (!isMobile) {
      e.currentTarget.style.background = 'rgba(0, 255, 136, 0.3)';
    }
  };

  const handleViewDetailsMouseLeave = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.2)';
  };

  const searchTypes: SearchType[] = ['hero', 'champion', 'agent'];

  return (
    <section
      id="wiki"
      style={{
        padding: isMobile ? '2rem 1rem' : '4rem 2rem',
        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(255, 51, 51, 0.05) 100%)',
        borderTop: '2px solid rgba(0, 255, 136, 0.3)',
        borderBottom: '2px solid rgba(0, 255, 136, 0.3)'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <h2
          style={{
            color: '#00ff88',
            fontSize: isMobile ? '1.5rem' : '2rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}
        >
          Wiki Search
        </h2>

        {/* Search Form */}
        <form onSubmit={handleWikiSearch} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {/* Search Type Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {searchTypes.map((type: SearchType) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleSearchTypeClick(type)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '6px',
                    border: `2px solid ${wikiSearchType === type ? '#00ff88' : 'rgba(0, 255, 136, 0.3)'}`,
                    background: wikiSearchType === type ? 'rgba(0, 255, 136, 0.2)' : 'transparent',
                    color: wikiSearchType === type ? '#00ff88' : '#a0a0a0',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    textTransform: 'capitalize'
                  }}
                  onMouseEnter={handleButtonMouseEnter}
                  onMouseLeave={handleButtonMouseLeave}
                >
                  {type === 'hero' && ''}
                  {type === 'champion' && ''}
                  {type === 'agent' && ''}
                  {type}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              <input
                type="text"
                value={wikiSearchQuery}
                onChange={handleInputChange}
                placeholder={`Search for a ${wikiSearchType}...`}
                style={{
                  flex: 1,
                  minWidth: isMobile ? '100%' : '300px',
                  padding: '0.8rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  background: 'rgba(0, 255, 136, 0.05)',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="submit"
                disabled={isWikiLoading || !wikiSearchQuery.trim()}
                style={{
                  padding: '0.8rem 1.5rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: isWikiLoading ? 'rgba(0, 255, 136, 0.3)' : 'linear-gradient(135deg, #00ff88, #00cc6a)',
                  color: isWikiLoading ? '#008844' : '#000',
                  cursor: isWikiLoading ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  opacity: isWikiLoading || !wikiSearchQuery.trim() ? 0.6 : 1
                }}
              >
                {isWikiLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </form>

        {/* Loading State */}
        {isWikiLoading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '3rem 1rem',
              gap: '0.5rem'
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#00ff88',
                animation: 'bounce 1.4s infinite'
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#00ff88',
                animation: 'bounce 1.4s infinite',
                animationDelay: '0.2s'
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#00ff88',
                animation: 'bounce 1.4s infinite',
                animationDelay: '0.4s'
              }}
            />
          </div>
        )}

        {/* Results */}
        {!isWikiLoading && wikiSearchResults.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {wikiSearchResults.slice(0, 12).map((result: WikiSearchResult, idx: number) => (
              <div
                key={idx}
                onClick={() => handleResultClick(result)}
                style={{
                  background: 'rgba(0, 255, 136, 0.08)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)'
                }}
                onMouseEnter={handleResultCardMouseEnter}
                onMouseLeave={handleResultCardMouseLeave}
              >
                {/* Result Image */}
                {result.data?.image && (
                  <img
                    src={result.data.image}
                    alt={result.name}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginBottom: '0.8rem',
                      border: '1px solid rgba(0, 255, 136, 0.2)'
                    }}
                  />
                )}

                {/* Result Name */}
                <h3
                  style={{
                    color: '#00ff88',
                    marginTop: 0,
                    marginBottom: '0.4rem',
                    fontSize: '1rem'
                  }}
                >
                  {result.name}
                </h3>

                {/* Result Type */}
                {result.type && (
                  <p
                    style={{
                      color: '#a0a0a0',
                      fontSize: '0.8rem',
                      marginBottom: '0.4rem'
                    }}
                  >
                    {result.type}
                  </p>
                )}

                {/* Result Role/Class */}
                {result.data?.role && (
                  <p
                    style={{
                      color: '#00ff88',
                      fontSize: '0.8rem',
                      marginBottom: '0.4rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Role: {result.data.role}
                  </p>
                )}

                {/* Result Description */}
                {result.data?.description && (
                  <p
                    style={{
                      color: '#a0a0a0',
                      fontSize: '0.75rem',
                      marginBottom: '0.8rem',
                      lineHeight: '1.4',
                      height: '2.4rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {result.data.description}
                  </p>
                )}

                {/* View Details Button */}
                <button
                  style={{
                    width: '100%',
                    background: 'rgba(0, 255, 136, 0.2)',
                    border: '1px solid rgba(0, 255, 136, 0.4)',
                    color: '#00ff88',
                    padding: '0.6rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={(e: MouseEvent<HTMLButtonElement>) =>
                    handleViewDetailsClick(e, result)
                  }
                  onMouseEnter={handleViewDetailsMouseEnter}
                  onMouseLeave={handleViewDetailsMouseLeave}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isWikiLoading && wikiSearchQuery && wikiSearchResults.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#a0a0a0'
            }}
          >
            <p
              style={{
                fontSize: '1.1rem',
                marginBottom: '0.5rem'
              }}
            >
              No results found for "{wikiSearchQuery}"
            </p>
            <p
              style={{
                fontSize: '0.9rem'
              }}
            >
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WikiSearch;
