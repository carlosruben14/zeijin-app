import React, { FC } from 'react';
import type { Game, ImageLoadingStates } from '../types';

interface GameCardProps {
  game: Game;
  isMobile?: boolean;
  imageLoadingStates: ImageLoadingStates;
  setImageLoadingStates: React.Dispatch<React.SetStateAction<ImageLoadingStates>>;
  setSelectedGame: (game: Game) => void;
  category?: string;
}

const GameCard: FC<GameCardProps> = ({
  game,
  isMobile,
  imageLoadingStates,
  setImageLoadingStates,
  setSelectedGame,
  category,
}) => {
  const isLoading = !imageLoadingStates[game.id];

  const handleImageLoad = (): void => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [game.id]: true,
    }));
  };

  return (
    <div
      onClick={() => setSelectedGame(game)}
      style={{
        background: 'rgba(255, 51, 51, 0.05)',
        border: '2px solid #ff3333',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: 'scale(1)',
      }}
      onMouseEnter={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 51, 51, 0.5)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Game Image */}
      <div
        style={{
          position: 'relative',
          height: '180px',
          background: 'rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
        }}
      >
        {isLoading && (
          <div
            style={{
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
              backgroundSize: '200% 100%',
              animation: 'loading 1.5s infinite',
            }}
          />
        )}
        <img
          src={game.image}
          alt={game.title}
          onLoad={handleImageLoad}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />
        {/* Category Badge */}
        {category && (
          <div
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: 'rgba(255, 51, 51, 0.8)',
              color: '#fff',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            {category}
          </div>
        )}
      </div>

      {/* Game Info */}
      <div style={{ padding: '1rem' }}>
        <h3
          style={{
            color: '#ff3333',
            fontSize: '1rem',
            fontWeight: 'bold',
            marginBottom: '0.4rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {game.title}
        </h3>
        <p
          style={{
            color: '#a0a0a0',
            fontSize: '0.8rem',
            marginBottom: '0.8rem',
            lineHeight: '1.4',
            height: '2.4rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2 as any,
            WebkitBoxOrient: 'vertical' as any,
          }}
        >
          {game.description}
        </p>

        {/* Pricing Info */}
        {game.pricing && game.pricing.length > 0 && (
          <div
            style={{
              background: 'rgba(0, 255, 136, 0.1)',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              padding: '0.6rem',
              borderRadius: '6px',
              marginBottom: '0.8rem',
            }}
          >
            <div
              style={{
                color: '#00ff88',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                marginBottom: '0.3rem',
              }}
            >
              Starting from:
            </div>
            <div style={{ color: '#00ff88', fontSize: '1rem', fontWeight: 'bold' }}>
              ₱{game.pricing[0].price}
            </div>
          </div>
        )}

        {/* View Prices Button */}
        <button
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #ff3333, #ff5555)',
            color: 'white',
            border: 'none',
            padding: '0.6rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.boxShadow =
                '0 0 15px rgba(255, 51, 51, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedGame(game);
          }}
        >
          View Prices
        </button>
      </div>
    </div>
  );
};

export default GameCard;
